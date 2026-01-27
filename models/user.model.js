const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({

    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: "India" },
    isDefault: { type: Boolean, default: false }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    profileImage: {
        type: String
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    address: [addressSchema],
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],

    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)