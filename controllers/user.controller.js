const nodemailer = require("nodemailer");
const User = require("../models/user.model");
const emailQueue = require("../queues/email.queue");


const getProfile = async (req, res) => {
    try {
        const token = req.cookies.Token;

        if (token) {
            return res.status(400).json({
                success: false,
                message: "Token not found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log("Decoded Token is :", decoded);

        const user = User.findOne({ id: decoded.id }).select("-password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User profile gets successfully",
            data: user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        console.log("Inside profile update");

        const userId = req.user.id;
        console.log("id is", userId);

        const { name, phone } = req.body;
        let { address } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (name) user.name = name;
        if (phone) user.phone = phone;

        // multer upload
        if (req.file) {
            user.profileImage = req.file.path;
        }

        //  Address Handling
        if (address) {

            // form-data fix
            if (typeof address === "string") {
                address = JSON.parse(address);
            }

            // default address logic
            if (address.isDefault) {
                user.address.forEach(addr => {
                    addr.isDefault = false;
                });
            }

            user.address.push(address);
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Profile update failed"
        });
    }
};

const uploadProfileImage = async (req, res) => {
    try {
        console.log("Inside change profile");

        const userId = req.user.id;
        console.log("id is", userId);


        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // multer upload
        if (req.file) {
            user.profileImage = req.file.path;
        }


        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Profile update failed"
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    uploadProfileImage
};
