const Coupon = require("../models/coupon.model");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/api-response");
const asyncHandler = require("../utils/async-handler");

const createCoupon = asyncHandler(async (req, res) => {

    const { code, discount, discountType, minAmount, isActive, expiryTime } = req.body;

    // Required fields validation
    if (!code || discount == null || !discountType || minAmount == null) {
        throw new ApiError({
            statusCode: 400,
            message: "Required fields are missing"
        });
    }

    // Check duplicate coupon
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase().trim() });

    if (existingCoupon) {
        throw new ApiError({
            statusCode: 400,
            message: "Coupon already exists"
        });
    }

    // Create coupon
    const coupon = await Coupon.create({
        code: code.toUpperCase().trim(),
        discount,
        discountType,
        minAmount,
        isActive: isActive ?? true,
        expiryTime
    });

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            success: true,
            message: "Coupon created successfully",
            data: coupon
        })
    );
});

const applyForCoupon = asyncHandler(async (req, res) => {
    const { code, cartTotal } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError({
            statusCode: 401,
            message: "Authentication is required"
        });
    }

    if (!code || cartTotal == null) {
        throw new ApiError({
            statusCode: 400,
            message: "Required fields are missing"
        });
    }

    const formattedCode = code.toUpperCase().trim();
    const coupon = await Coupon.findOne({ code: formattedCode });

    if (!coupon) {
        throw new ApiError({
            statusCode: 400,
            message: "Invalid coupon code"
        });
    }

    if (!coupon.isActive) {
        throw new ApiError({
            statusCode: 400,
            message: "Coupon is not active"
        });
    }

    if (coupon.expiryTime && new Date() > coupon.expiryTime) {
        throw new ApiError({
            statusCode: 400,
            message: "Coupon has expired"
        });
    }

    if (cartTotal < coupon.minAmount) {
        throw new ApiError({
            statusCode: 400,
            message: `Minimum cart total should be ${coupon.minAmount}`
        });
    }

    const userUsageCount = coupon.usedBy.filter(
        (id) => id.toString() === userId.toString()
    ).length;

    if (coupon.usageLimitPerUser && userUsageCount >= coupon.usageLimitPerUser) {
        throw new ApiError({
            statusCode: 400,
            message: "Coupon usage limit exceeded"
        });
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
        discount = (coupon.discount * cartTotal) / 100;
    } else {
        discount = coupon.discount;
    }

    if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
    }

    discount = Math.min(discount, cartTotal);
    const finalPrice = cartTotal - discount;

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Coupon applied successfully",
            data: { discount, finalPrice, couponCode: formattedCode }
        })
    );
});

module.exports = { createCoupon, applyForCoupon };