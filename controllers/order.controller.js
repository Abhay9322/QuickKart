const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const Coupon = require("../models/coupon.model");
const User = require("../models/user.model");

const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/api-response");
const asyncHandler = require("../utils/async-handler");

// Generate Order ID
const generateOrderId = () => "ORD-" + Date.now();


// =========================
// CREATE ORDER
// =========================
const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { couponCode, shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        throw new ApiError({
            statusCode: 400,
            message: "Cart is empty"
        });
    }

    let orderItems = [];
    let subtotalAmount = 0;
    let totalItems = 0;

    for (let item of cart.items) {
        const product = item.product;

        if (product.stock < item.quantity) {
            throw new ApiError({
                statusCode: 400,
                message: `Insufficient stock for ${product.title}`
            });
        }

        const subtotal = product.price * item.quantity;
        subtotalAmount += subtotal;
        totalItems += item.quantity;

        orderItems.push({
            productId: product._id,
            name: product.title,
            image: product.image,
            priceAtPurchase: product.price,
            quantity: item.quantity,
            subtotal
        });

        product.stock -= item.quantity;
        product.sold += item.quantity;
        await product.save();
    }

    // Coupon logic
    let discountAmount = 0;
    let appliedCoupon = null;

    if (couponCode) {
        const coupon = await Coupon.findOne({ code: couponCode.toUpperCase().trim() });

        if (!coupon || !coupon.isActive) {
            throw new ApiError({ statusCode: 400, message: "Invalid coupon" });
        }

        if (coupon.expiryTime && new Date() > coupon.expiryTime) {
            throw new ApiError({ statusCode: 400, message: "Coupon expired" });
        }

        if (subtotalAmount < coupon.minAmount) {
            throw new ApiError({
                statusCode: 400,
                message: `Minimum amount should be ${coupon.minAmount}`
            });
        }

        if (coupon.discountType === "percentage") {
            discountAmount = (subtotalAmount * coupon.discount) / 100;
        } else {
            discountAmount = coupon.discount;
        }

        discountAmount = Math.min(discountAmount, coupon.maxDiscount || discountAmount);
        discountAmount = Math.min(discountAmount, subtotalAmount);

        appliedCoupon = coupon;
    }

    const taxAmount = subtotalAmount * 0.05;
    const shippingCharge = subtotalAmount > 500 ? 0 : 50;
    const grandTotal = subtotalAmount + taxAmount + shippingCharge - discountAmount;

    const newOrder = await Order.create({
        orderId: generateOrderId(),
        userId,
        items: orderItems,
        pricingDetails: {
            totalItems,
            subtotalAmount,
            taxAmount,
            shippingCharge,
            discountAmount,
            grandTotal
        },
        coupon: appliedCoupon?._id || null,
        couponCode: appliedCoupon?.code || null,
        shippingAddress,
        paymentInfo: {
            method: paymentMethod || "COD",
            status: paymentMethod === "COD" ? "pending" : "paid"
        },
        orderStatus: "pending",
        isPaid: paymentMethod !== "COD"
    });

    // ✅ FIX: Link order to user
    await User.findByIdAndUpdate(userId, {
        $push: { orders: newOrder._id, address: newOrder.shippingAddress }
    });

    // update coupon usage
    if (appliedCoupon) {
        await Coupon.findByIdAndUpdate(appliedCoupon._id, {
            $addToSet: { usedBy: userId }
        });
    }

    // clear cart
    cart.items = [];
    await cart.save();

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            success: true,
            message: "Order placed successfully",
            data: newOrder
        })
    );
});


// =========================
// GET USER ORDERS
// =========================
const getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            data: orders
        })
    );
});


// =========================
// GET ORDER BY ID
// =========================
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new ApiError({ statusCode: 404, message: "Order not found" });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            data: order
        })
    );
});


// =========================
// GET ALL ORDERS (ADMIN)
// =========================
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            data: orders
        })
    );
});


// =========================
// ORDER STATUS
// =========================
const orderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
        throw new ApiError({ statusCode: 404, message: "Order not found" });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            data: order.orderStatus
        })
    );
});


// =========================
// ORDER HISTORY (PAGINATION)
// =========================
const orderHistory = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalOrders = await Order.countDocuments({ userId });

    const orders = await Order.find({ userId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            data: orders,
            page,
            limit,
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit)
        })
    );
});


// =========================
// RETURN REQUEST
// =========================
const returnRequest = asyncHandler(async (req, res) => {
    const { orderId, reason } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
        throw new ApiError({ statusCode: 404, message: "Order not found" });
    }

    order.returnStatus = "Requested";
    order.returnReason = reason;

    await order.save();

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Return requested"
        })
    );
});


// =========================
// CANCEL ORDER
// =========================
const cancelOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
        throw new ApiError({ statusCode: 404, message: "Order not found" });
    }

    if (["shipped", "out_for_delivery", "delivered"].includes(order.orderStatus)) {
        throw new ApiError({
            statusCode: 400,
            message: "Cannot cancel after shipping"
        });
    }

    order.orderStatus = "cancelled";
    await order.save();

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Order cancelled",
            data: order
        })
    );
});


// =========================
// EXCHANGE REQUEST (FIXED)
// =========================
const exchangeRequest = asyncHandler(async (req, res) => {
    const { orderId, reason } = req.body;

    const order = await Order.findOne({ orderId });

    if (!order) {
        throw new ApiError({ statusCode: 404, message: "Order not found" });
    }

    order.exchangeStatus = "Requested";
    order.exchangeReason = reason;

    await order.save();

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Exchange requested"
        })
    );
});


// =========================
// TRACKING
// =========================
const orderTracking = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findOne(
        { "trackingInfo.trackingId": id },
        { trackingInfo: 1, orderStatus: 1 }
    );

    if (!order) {
        throw new ApiError({ statusCode: 404, message: "Order not found" });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            data: order
        })
    );
});


// =========================
// EXPORTS
// =========================
module.exports = {
    createOrder,
    getUserOrders,
    getOrders,
    orderStatus,
    orderHistory,
    returnRequest,
    cancelOrder,
    exchangeRequest,
    getOrderById
};