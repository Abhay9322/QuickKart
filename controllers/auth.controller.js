const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken")
const User = require("../models/user.model");
const emailQueue = require("../queues/email.queue");


const register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        const profileImage = req.file ? req.file.path : null;
        console.log("ProfileImage url :", profileImage);


        if (!name || !email || !password) {
            return res.status(400).json({ message: "Required fields are missing" })
        }
        const existingUser = await User.findOne({
            email
        })

        if (existingUser) {
            return res.status(409).json({ message: "User already registred" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            profileImage
        });

        const token = crypto.randomBytes(32).toString("hex");

        user.emailVerificationToken = token,
            user.emailVerificationExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        const verifyURL = `http://localhost:5000/api/auth/verify-email/${token}`;

        const message = `<h2>Email Verification</h2>
                         <a href="${verifyURL}">Click to Verify Email</a>`;

        await emailQueue.add({
            email: user.email,
            subject: "Verify Your Email",
            message: message
        })
        res.send({ message: "Verification email sent" })

    } catch (error) {
        console.log("Error is:", error);

        return res.status(500).json({ message: "Internal server error" })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Required fields are missing" })
        }

        const user = await User.findOne({ email })

        if (!user.isEmailVerified) {
            return res.status(401).json({
                message: "Please verify email first"
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({
                message: "Your account is blocked by admin"
            });
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }

        // const token = generateAccessToken(user);
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Save refresh token in DB
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("Token", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "User logged in successfully", accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        })
    } catch (error) {
        console.log("Error occured while logging", error);
        return res.status(500).json({ message: "Internal server while login" })

    }
};

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token" });
    }

    // Check in DB
    const user = await User.findOne({ refreshToken });

    if (!user) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Expired refresh token" });
        }

        const newAccessToken = generateAccessToken(user);

        res.json({ accessToken: newAccessToken });
    });
};

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
