const Coupon = require("../models/coupon.model");

const createCoupon = async (req, res) => {
    try {
        const { code, discount, discountType, minAmount, isActive, expiryTime } = req.body;

        // Validation
        if (!code || discount == null || !discountType || minAmount == null) {
            return res.status(400).json({
                success: false,
                message: "Required fields are necessary"
            });
        }

        // Check duplicate
        const existingCoupon = await Coupon.findOne({ code: code.toUpperCase().trim() });

        if (existingCoupon) {
            return res.status(400).json({
                success: false,
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

        res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            coupon
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

const applyForCoupon = async (req, res) => {
    try {
        const { code, cartTotal } = req.body;
        const userId = req.params

        // 1. Validation
        if (!code || cartTotal == null) {
            return res.status(400).json({
                success: false,
                message: "Required fields are necessary"
            });
        }

        const formattedCode = code.toUpperCase().trim();

        // 2. Find coupon
        const coupon = await Coupon.findOne({ code: formattedCode });

        if (!coupon) {
            return res.status(400).json({
                success: false,
                message: "Invalid coupon code"
            });
        }

        // 3. Active check
        if (!coupon.isActive) {
            return res.status(400).json({
                success: false,
                message: "Coupon not active"
            });
        }

        // 4. Expiry check
        if (coupon.expiryTime && new Date() > coupon.expiryTime) {
            return res.status(400).json({
                success: false,
                message: "Coupon expired"
            });
        }

        // 5. Min amount
        if (cartTotal < coupon.minAmount) {
            return res.status(400).json({
                success: false,
                message: `Minimum amount should be ${coupon.minAmount}`
            });
        }

        // 6. One-time / usage check
        const userUsageCount = coupon.usedBy.filter(
            (id) => id.toString() === userId.toString()
        ).length;

        if (userUsageCount >= coupon.usageLimitPerUser) {
            return res.status(400).json({
                success: false,
                message: "Coupon usage limit exceeded"
            });
        }

        // 7. Calculate discount
        let discount = 0;

        if (coupon.discountType === "percentage") {
            discount = (coupon.discount * cartTotal) / 100;
        } else {
            discount = coupon.discount;
        }

        // 8. Max discount cap
        if (coupon.maxDiscount) {
            discount = Math.min(discount, coupon.maxDiscount);
        }

        // Prevent over-discount
        discount = Math.min(discount, cartTotal);

        const finalPrice = cartTotal - discount;

        res.status(200).json({
            success: true,
            message: "Coupon applied successfully",
            discount,
            finalPrice
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

module.exports = { createCoupon, applyForCoupon };