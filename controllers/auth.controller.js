const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken")
const User = require("../models/user.model");
const emailQueue = require("../queues/email.queue");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/api-response");
const asyncHandler = require("../utils/async-handler");


const register = asyncHandler(async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError({
            statusCode: 409,
            message: "User already registered"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role
    });

    const token = crypto.randomBytes(32).toString("hex");

    user.emailVerificationToken = token;
    user.emailVerificationExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const verifyURL = `${process.env.BASE_URL}/api/auth/verify-email/${token}`;

    const message = `
        <h2>Email Verification</h2>
        <p>Click below link to verify your email:</p>
        <a href="${verifyURL}">Verify Email</a>
    `;

    await emailQueue.add({
        email: user.email,
        subject: "Verify Your Email",
        message
    });

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            message: "Verification email sent successfully"
        })
    );
});


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError({
            statusCode: 400,
            message: "Invalid Email or Password"
        });
    }

    if (!user.isEmailVerified) {
        throw new ApiError({
            statusCode: 401,
            message: "Please verify email first"
        });
    }

    if (user.isBlocked) {
        throw new ApiError({
            statusCode: 403,
            message: "Your account is blocked by admin"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError({
            statusCode: 400,
            message: "Invalid Email or Password"
        });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("Token", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            message: "User logged in successfully",
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
                accessToken,
                refreshToken
            }
        })
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        throw new ApiError({
            statusCode: 401,
            message: "No refresh token"
        });
    }

    const user = await User.findOne({ refreshToken });

    if (!user) {
        throw new ApiError({
            statusCode: 403,
            message: "Invalid refresh token"
        });
    }

    try {
        jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        const newAccessToken = generateAccessToken(user);

        return res.status(200).json(
            new ApiResponse({
                statusCode: 200,
                message: "Access token refreshed successfully",
                data: {
                    accessToken: newAccessToken
                }
            })
        );

    } catch (error) {
        throw new ApiError({
            statusCode: 403,
            message: "Expired or invalid refresh token"
        });
    }
});


const logout = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById({ userId });

        if (!user) {
            return res.status(400).json({
                success: true,
                message: "User not found"
            })
        }

        user.refreshToken = null;
        await user.save()

        return res.status(200).json({
            success: true,
            message: "User logout successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const forgotPassword = async (req, res) => {
    console.log("Inside forgotPassword controller");

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

        const newUser = await user.save();
        console.log("newUser is :", newUser);



        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;


        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset Request",
            html: `
                <h3>Password Reset</h3>
                <p>Click below link to reset password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
            `
        });


        return res.status(200).json({
            success: true,
            message: "Reset link sent to email"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        if (!password || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and newPassword are required"
            });
        }

        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();



        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        console.log("Inside verifyEmail Controller function");

        const token = req.params.token;

        console.log("Token is", token);


        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpire: { $gt: Date.now() }
        });

        console.log("User", user);


        if (!user) {
            return res.status(400).json({
                message: "Token Invalid or Expired"
            });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpire = undefined;




        await user.save();
        console.log("isEmailVerified:", user.isEmailVerified);

        res.status(200).json({
            success: true,
            message: "Email Verified Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = {
    register,
    login,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    verifyEmail
};
