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

const {
    sendEmail,
    emailVerificationMailGenContent,
    forgotPasswordMailGenContent
} = require("../utils/sendEmail");


const register = asyncHandler(async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone) {
        throw new ApiError({
            statusCode: 400,
            message: "Required fields are neccessary"
        });
    }

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
        role: "User"
    });

    // const token = crypto.randomBytes(32).toString("hex");

    // user.emailVerificationToken = token;
    // user.emailVerificationExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // const verifyURL = `${process.env.BASE_URL}/api/auth/verify-email/${token}`;

    // const message = `
    //     <h2>Email Verification</h2>
    //     <p>Click below link to verify your email:</p>
    //     <a href="${verifyURL}">Verify Email</a>
    //     // token is : ${token}
    // `;

    // await emailQueue.add({
    //     email: user.email,
    //     subject: "Verify Your Email",
    //     message
    // });

    // const emailResult = sendEmail({
    //     email: user.email,
    //     subject: user.subject,
    //     message: "Click below link to verify your email:",
    //     mailGenContent: emailVerificationMailGenContent(user.name, verifyURL)
    // })

    // console.log("emailResult is:", emailResult);


    // return res.status(201).json(
    //     new ApiResponse({
    //         statusCode: 201,
    //         message: "Verification email sent successfully"
    //     })
    // );


    // *************************************** Temp ********************
    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            message: "User registred successfully"
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

    // if (!user.isEmailVerified) {
    //     throw new ApiError({
    //         statusCode: 401,
    //         message: "Please verify email first"
    //     });
    // }

    // if (user.isBlocked) {
    //     throw new ApiError({
    //         statusCode: 403,
    //         message: "Your account is blocked by admin"
    //     });
    // }

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

    res.cookie("token", accessToken, {
        httpOnly: true,
        secure: false,       // local me false
        sameSite: "lax",     // 🔥 IMPORTANT
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


const logout = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError({
            statusCode: 404,
            message: "User not found"
        });
    }

    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            message: "User logged out successfully"
        })
    );
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError({
            statusCode: 404,
            message: "User not found"
        });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // const transporter = nodemailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     secure: false,
    //     auth: {
    //         user: process.env.SMTP_USER,
    //         pass: process.env.SMTP_PASS,
    //     },
    // });


    // await transporter.sendMail({
    //     to: user.email,
    //     subject: "Password Reset Request",
    //     html: `
    //         <h3>Password Reset</h3>
    //         <p>Click below link to reset password:</p>
    //         <a href="${resetUrl}">${resetUrl}</a>
    //     `
    // });

    const emailResult = sendEmail({
        email: user.email,
        subject: "Reset your password",
        message: "Click below link to reset your password:",
        mailGenContent: forgotPasswordMailGenContent(user.name, resetUrl)
    })

    console.log("EmailResult is:", emailResult);

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            message: "Reset link sent to email"
        })
    );
});

const resetPassword = asyncHandler(async (req, res) => {
    console.log("Inside resetPassword controller");

    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError({
            statusCode: 400,
            message: "Invalid or expired token"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            message: "Password reset successfully"
        })
    );
});


const changePassword = asyncHandler(async (req, res) => {
    console.log("Inside changePassword controller");

    const { password, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError({
            statusCode: 404,
            message: "User not found"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError({
            statusCode: 400,
            message: "Current password is incorrect"
        });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            message: "Password changed successfully"
        })
    );
});


const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({
        emailVerificationToken: token,
        emailVerificationExpire: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError({
            statusCode: 400,
            message: "Token invalid or expired"
        });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            message: "Email verified successfully"
        })
    );
});

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
