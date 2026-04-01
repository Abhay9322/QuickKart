const User = require("../models/user.model");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/api-response");
const asyncHandler = require("../utils/async-handler");

const blockUser = asyncHandler(async (req, res) => {

    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError({
            statusCode: 404,
            message: "User not found"
        });
    }

    if (user.isBlocked) {
        throw new ApiError({
            statusCode: 400,
            message: "User already blocked"
        });
    }

    user.isBlocked = true;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "User blocked successfully",
            data: user
        })
    );
});

const unblockUser = asyncHandler(async (req, res) => {

    console.log("Inside unblockUser controller");

    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
        userId,
        { isBlocked: false },
        { new: true }
    );

    // user exist check
    if (!user) {
        throw new ApiError({
            statusCode: 404,
            message: "User not found"
        });
    }

    // already unblocked check
    if (!user.isBlocked) {
        throw new ApiError({
            statusCode: 400,
            message: "User is already unblocked"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "User unblocked successfully",
            data: user
        })
    );
});

module.exports = {
    blockUser,
    unblockUser
};
