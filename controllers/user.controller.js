const nodemailer = require("nodemailer");
const User = require("../models/user.model");
const emailQueue = require("../queues/email.queue");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/api-response");
const asyncHandler = require("../utils/async-handler");


const getProfile = asyncHandler(async (req, res) => {

    console.log("Inside getProfile Controller");

    // const token = req.cookies?.Token;
    const userId = req.params.id

    // if (!token) {
    //     throw new ApiError({
    //         statusCode: 400,
    //         message: "Token not found"
    //     });
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // const user = await User.findById(decoded.id).select("-password");

    const user = await User.findById(userId)

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
    const userId = req.user.id;
    const { name, phone } = req.body;
    let { address } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError({
            statusCode: 404,
            message: "User not found"
        });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    if (req.file) {
        user.profileImage = req.file.path;
    }

    if (address) {
        if (typeof address === "string") {
            address = JSON.parse(address);
        }

        if (address.isDefault) {
            user.address.forEach(addr => {
                addr.isDefault = false;
            });
        }

        user.address.push(address);
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

module.exports = {
    getProfile,
    updateProfile,
    uploadProfileImage
};
