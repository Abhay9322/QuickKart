const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
    refreshToken: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    address: [addressSchema],
    isBlocked: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },

    emailVerificationToken: {
        type: String
    },

    emailVerificationExpire: {
        type: Date
    },
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

userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
    );
};

module.exports = mongoose.model("User", userSchema)