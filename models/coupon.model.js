const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    discount: {
        type: Number,
        required: true
    },
    discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        default: "percentage"
    },
    expiryTime: {
        type: Date
    },
    minAmount: {
        type: Number,
        required: true,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    maxDiscount: {
        type: Number
    },
    usedBy: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    usageLimitPerUser: { type: Number, default: 1 } // कितनी बार use कर सकता है
}, { timestamps: true });

module.exports = mongoose.model("Coupon", couponSchema);