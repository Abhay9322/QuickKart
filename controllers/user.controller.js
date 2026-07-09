const nodemailer = require("nodemailer");
const User = require("../models/user.model");
const emailQueue = require("../queues/email.queue");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/api-response");
const asyncHandler = require("../utils/async-handler");


const getProfile = asyncHandler(async (req, res) => {

    console.log("Inside getProfile Controller");

    const userId = req.params.id;

    const user = await User.findById(userId)
        .populate("orders")
        .select("-password");

    if (!user) {
        throw new ApiError({
            statusCode: 404,
            message: "User not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "User profile fetched successfully",
            data: user
        })
    );
});
const updateProfile = asyncHandler(async (req, res) => {
    console.log("Inside updateProfile");

    console.log("Body:", req.body);

    console.log("File:", req.file);

    const userId = req.user.id;

    const user = await User.findById(userId);

    console.log("User Found:", user?._id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (req.file) {
        console.log("Cloudinary URL:", req.file.path);

        user.profileImage = req.file.path;
    }

    await user.save();

    console.log("User Saved Successfully");

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: user
    });
});

const uploadProfileImage = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError({
            statusCode: 404,
            message: "User not found"
        });
    }

    if (req.file) {
        user.profileImage = req.file.path;
    }

    await user.save();

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Profile updated successfully",
            data: user
        })
    );
});

const getUsers = asyncHandler(async (req, res) => {

    console.log("Inside getUser Controller");

    const users = await User.find()
        .populate("orders")
        .select("-password");

    if (!users) {
        throw new ApiError({
            statusCode: 404,
            message: "Users not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Users profile fetched successfully",
            data: users
        })
    );
});

module.exports = {
    getProfile,
    updateProfile,
    uploadProfileImage,
    getUsers
};
