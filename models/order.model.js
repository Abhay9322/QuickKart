const mongoose = require("mongoose");

// 1️⃣ Order Item Schema (Products inside order)
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    priceAtPurchase: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    }
});

// 2️⃣ Shipping Address Schema
const shippingAddressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
});

// 3️⃣ Payment Info Schema
const paymentInfoSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ["COD", "Stripe", "Razorpay"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },
    transactionId: {
        type: String
    },
    paidAt: {
        type: Date
    }
});

// 4️⃣ Main Order Schema
const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [orderItemSchema],

        pricingDetails: {
            totalItems: { type: Number, required: true },
            subtotalAmount: { type: Number, required: true },
            taxAmount: { type: Number, default: 0 },
            shippingCharge: { type: Number, default: 0 },
            discountAmount: { type: Number, default: 0 },
            grandTotal: { type: Number, required: true }
        },

        shippingAddress: shippingAddressSchema,

        paymentInfo: paymentInfoSchema,

        orderStatus: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
                "returned"
            ],
            default: "pending"
        },

        trackingInfo: {
            courierName: { type: String },
            trackingId: { type: String, index: true },
            shippedAt: { type: Date },
            deliveredAt: { type: Date }
        },

        isPaid: {
            type: Boolean,
            default: false
        },

        isDelivered: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);