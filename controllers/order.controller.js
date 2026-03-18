const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const Coupon = require("../models/coupon.model");

// Helper function to generate orderId
const generateOrderId = () => {
    return "ORD-" + Date.now();
};

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { couponCode, shippingAddress, paymentMethod } = req.body;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        let orderItems = [];
        let subtotalAmount = 0;
        let totalItems = 0;

        for (let item of cart.items) {
            const product = item.product;

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
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
                return res.status(400).json({
                    success: false,
                    message: "Invalid coupon"
                });
            }

            if (!coupon.isActive) {
                return res.status(400).json({
                    success: false,
                    message: "Coupon not active"
                });
            }

            if (coupon.expiryTime && new Date() > coupon.expiryTime) {
                return res.status(400).json({
                    success: false,
                    message: "Coupon expired"
                });
            }

            if (subtotalAmount < coupon.minAmount) {
                return res.status(400).json({
                    success: false,
                    message: `Minimum amount should be ${coupon.minAmount}`
                });
            }

            const userUsageCount = coupon.usedBy.filter(
                (id) => id.toString() === userId.toString()
            ).length;

            if (userUsageCount >= coupon.usageLimitPerUser) {
                return res.status(400).json({
                    success: false,
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

        const grandTotal =
            subtotalAmount + taxAmount + shippingCharge - discountAmount;

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

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getUserOrders = async (req, res) => {
    console.log("Inside getUserOrders controller");

    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json(
                {
                    success: false,
                    message: "user authentication is required"
                }
            )
        }

        const orders = await Order.find({ userId });

        if (!orders) {
            return res.status(400).json({
                success: false,
                message: "Orders not found"
            })
        }


        return res.status(200).json({
            success: true,
            message: "Orders feteched successfully",
            data: orders
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const getOrders = async (req, res) => {
    console.log("Inside getOrders controller");

    try {
        // const Role = req.user.role;

        // if (Role !== "admin") {
        //     return res.status(400).json(
        //         {
        //             success: false,
        //             message: "admin authentication is required"
        //         }
        //     )
        // }

        const orders = await Order.find();

        if (!orders) {
            return res.status(400).json({
                success: false,
                message: "Orders not found"
            })
        }


        return res.status(200).json({
            success: true,
            message: "Orders feteched successfully",
            data: orders
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const orderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;

        // check orderId
        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "orderId is required"
            });
        }

        // find order
        const order = await Order.findOne({ orderId });

        // if order not found
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // success response
        res.status(200).json({
            success: true,
            message: "Order status fetched successfully",
            data: order.status
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const orderHistory = async (req, res) => {
    try {

        const totalOrders = await Order.countDocuments({ user: req.params.id });
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        // find orders
        const orders = await Order
            .find({ user: req.params.id })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        // check if no orders found
        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Orders not found"
            });
        }

        res.status(200).json({
            success: true,
            page,
            limit,
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit),
            data: orders
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const returnRequest = async (req, res) => {
    try {

        const { orderId, reason } = req.body;

        if (!orderId || !reason) {
            return res.status(400).json({
                success: false,
                message: "orderId and reason are required"
            });
        }

        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.returnStatus = "Requested";
        order.returnReason = reason;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Return request submitted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
};

const cancelOrder = async (req, res) => {
    try {

        const { orderId } = req.params;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "orderId is required"
            });
        }

        // find order
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // check if already shipped
        if (
            order.orderStatus === "Shipped" ||
            order.orderStatus === "Out for Delivery" ||
            order.orderStatus === "Delivered"
        ) {
            return res.status(400).json({
                success: false,
                message: "Order cannot be cancelled after shipping"
            });
        }

        // update status
        order.orderStatus = "Cancelled";

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            data: order
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const exchangeRequest = async (req, res) => {
    try {
        const { orderId, reason } = req.body;

        if (!orderId || !reason) {

        }
    } catch (error) {

    }
}

const orderTracking = async (req, res) => {
    try {
        const { id: trackingId } = req.params;

        if (!trackingId || trackingId.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Tracking ID is required"
            });
        }

        const order = await Order.findOne(
            { "trackingInfo.trackingId": trackingId },
            { trackingInfo: 1, orderStatus: 1 }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order tracking fetched successfully",
            trackingInfo: order.trackingInfo,
            orderStatus: order.orderStatus
        });

    } catch (error) {
        console.error("Order Tracking Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

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