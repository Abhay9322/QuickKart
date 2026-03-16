const User = require("../models/user.model");

const blockUser = async (req, res) => {

    try {
        console.log("Inside blockUser controller");

        const userId = req.params.id;

        const user = await User.findByIdAndUpdate(
            userId,
            { isBlocked: true },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "User blocked successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            user
        });
    }
};

const unblockUser = async (req, res) => {

    try {
        console.log("Inside unblockUser controller");

        const userId = req.params.id;

        const user = await User.findByIdAndUpdate(
            userId,
            { isBlocked: false },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "User unblocked successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            user
        });
    }
};

module.exports = {
    blockUser,
    unblockUser
};
