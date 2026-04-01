const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const Coupon = require("../models/coupon.model");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/api-response");
const asyncHandler = require("../utils/async-handler");

// Helper function to generate orderId
const generateOrderId = () => {
    return "ORD-" + Date.now();
};

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
            subtotal: subtotal
        });

        product.stock -= item.quantity;
        product.sold += item.quantity;
        await product.save();
    }

    let discountAmount = 0;
    let appliedCoupon = null;

    if (couponCode) {
        const formattedCode = couponCode.toUpperCase().trim();
        const coupon = await Coupon.findOne({ code: formattedCode });

        if (!coupon) {
            throw new ApiError({
                statusCode: 400,
                message: "Invalid coupon"
            });
        }

        if (!coupon.isActive) {
            throw new ApiError({
                statusCode: 400,
                message: "Coupon not active"
            });
        }

        if (coupon.expiryTime && new Date() > coupon.expiryTime) {
            throw new ApiError({
                statusCode: 400,
                message: "Coupon expired"
            });
        }

        if (subtotalAmount < coupon.minAmount) {
            throw new ApiError({
                statusCode: 400,
                message: `Minimum amount should be ${coupon.minAmount}`
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

        if (coupon.discountType === "percentage") {
            discountAmount = (subtotalAmount * coupon.discount) / 100;
        } else {
            discountAmount = coupon.discount;
        }

        if (coupon.maxDiscount) {
            discountAmount = Math.min(discountAmount, coupon.maxDiscount);
        }

        discountAmount = Math.min(discountAmount, subtotalAmount);
        appliedCoupon = coupon;
    }

    const taxAmount = subtotalAmount * 0.05;
    const shippingCharge = subtotalAmount > 500 ? 0 : 50;
    const grandTotal = subtotalAmount + taxAmount + shippingCharge - discountAmount;

    const newOrder = await Order.create({
        orderId: generateOrderId(),
        userId: userId,
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
        shippingAddress: shippingAddress,
        paymentInfo: {
            method: paymentMethod || "COD",
            status: paymentMethod === "COD" ? "pending" : "paid"
        },
        orderStatus: "pending",
        isPaid: paymentMethod === "COD" ? false : true
    });

    if (appliedCoupon) {
        await Coupon.findByIdAndUpdate(appliedCoupon._id, {
            $push: { usedBy: userId }
        });
    }

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


const getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError({
            statusCode: 401,
            message: "User authentication is required"
        });
    }

    const orders = await Order.find({ userId });

    if (!orders || orders.length === 0) {
        throw new ApiError({
            statusCode: 404,
            message: "Orders not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })
    );
});

const getOrders = asyncHandler(async (req, res) => {
    const role = req.user?.role;

    if (role !== "admin") {
        throw new ApiError({
            statusCode: 403,
            message: "Admin authentication is required"
        });
    }

    const orders = await Order.find();

    if (!orders || orders.length === 0) {
        throw new ApiError({
            statusCode: 404,
            message: "Orders not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })
    );
});

const orderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    if (!orderId) {
        throw new ApiError({
            statusCode: 400,
            message: "orderId is required"
        });
    }

    const order = await Order.findOne({ orderId });

    if (!order) {
        throw new ApiError({
            statusCode: 404,
            message: "Order not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Order status fetched successfully",
            data: order.status
        })
    );
});

const orderHistory = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalOrders = await Order.countDocuments({ user: userId });

    if (totalOrders === 0) {
        throw new ApiError({
            statusCode: 404,
            message: "Orders not found"
        });
    }

    const orders = await Order.find({ user: userId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Orders fetched successfully",
            data: orders,
            page,
            limit,
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit)
        })
    );
});

const returnRequest = asyncHandler(async (req, res) => {
    const { orderId, reason } = req.body;

    if (!orderId || !reason) {
        throw new ApiError({
            statusCode: 400,
            message: "orderId and reason are required"
        });
    }

    const order = await Order.findOne({ orderId });

    if (!order) {
        throw new ApiError({
            statusCode: 404,
            message: "Order not found"
        });
    }

    order.returnStatus = "Requested";
    order.returnReason = reason;

    await order.save();

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Return request submitted successfully"
        })
    );
});

const cancelOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    if (!orderId) {
        throw new ApiError({
            statusCode: 400,
            message: "orderId is required"
        });
    }

    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError({
            statusCode: 404,
            message: "Order not found"
        });
    }

    if (
        order.orderStatus === "Shipped" ||
        order.orderStatus === "Out for Delivery" ||
        order.orderStatus === "Delivered"
    ) {
        throw new ApiError({
            statusCode: 400,
            message: "Order cannot be cancelled after shipping"
        });
    }

    order.orderStatus = "Cancelled";

    await order.save();

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Order cancelled successfully",
            data: order
        })
    );
});

const exchangeRequest = async (req, res) => {
    try {
        const { orderId, reason } = req.body;

        if (!orderId || !reason) {

        }
    } catch (error) {

    }
}

const orderTracking = asyncHandler(async (req, res) => {
    const { id: trackingId } = req.params;

    if (!trackingId || trackingId.trim() === "") {
        throw new ApiError({
            statusCode: 400,
            message: "Tracking ID is required"
        });
    }

    const order = await Order.findOne(
        { "trackingInfo.trackingId": trackingId },
        { trackingInfo: 1, orderStatus: 1 }
    );

    if (!order) {
        throw new ApiError({
            statusCode: 404,
            message: "Order not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Order tracking fetched successfully",
            data: {
                trackingInfo: order.trackingInfo,
                orderStatus: order.orderStatus
            }
        })
    );
});

module.exports = {
    createOrder,
    getUserOrders,
    getOrders,
    orderStatus,
    orderHistory,
    returnRequest,
    cancelOrder,
    exchangeRequest
};