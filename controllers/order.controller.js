const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// Helper function to generate orderId
const generateOrderId = () => {
    return "ORD-" + Date.now();
};

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1️⃣ Check cart
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

        // 2️⃣ Validate products & calculate totals
        for (let item of cart.items) {

            const product = item.product;

            // Stock check
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.title}`
                });
            }

            const subtotal = product.price * item.quantity;

            subtotalAmount += subtotal;
            totalItems += item.quantity;

            // Order item snapshot
            orderItems.push({
                productId: product._id,
                name: product.title,
                image: product.image,
                priceAtPurchase: product.price,
                quantity: item.quantity,
                subtotal: subtotal
            });

            // 3️⃣ Update stock
            product.stock -= item.quantity;

            // 4️⃣ Update sold count (for trending products)
            product.sold += item.quantity;

            await product.save();
        }

        // 5️⃣ Pricing calculation
        const taxAmount = subtotalAmount * 0.05;
        const shippingCharge = subtotalAmount > 500 ? 0 : 50;
        const discountAmount = 0;

        const grandTotal =
            subtotalAmount + taxAmount + shippingCharge - discountAmount;

        // 6️⃣ Create Order
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

            shippingAddress: req.body.shippingAddress,

            paymentInfo: {
                method: req.body.paymentMethod || "COD",
                status: req.body.paymentMethod === "COD" ? "pending" : "paid"
            },

            orderStatus: "pending",
            isPaid: req.body.paymentMethod === "COD" ? false : true
        });

        // 7️⃣ Clear cart
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


module.exports = { createOrder, getUserOrders, getOrders };