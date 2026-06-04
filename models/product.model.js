const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }, 
    quantity: {
        value: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            enum: ["kg", "gm", "litre", "ml", "pcs"],
            required: true
        }
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    images: [
        {
            url: String,
            public_id: String
        }
    ],
    returnStatus: {
        type: String,
        enum: ["None", "Requested", "Approved", "Rejected", "Completed"],
        default: "None"
    },

    returnReason: {
        type: String,
        // required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);


