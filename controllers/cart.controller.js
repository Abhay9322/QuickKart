const Cart = require("../models/cart.model");

const addToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Authentication is required"
        })
    }

    try {

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: []
            });
            console.log("User cart created successfully");
        }

        const product = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (product) {
            product.quantity += 1;
        } else {
            cart.items.push({
                product: productId,
                quantity: 1
            });
        }

        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Product added to cart successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error"
        })
    }
}

const removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    try {

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found for user"
            })
        }

        const product = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            cart.items = cart.items.filter(
                (item) => item.product.toString() !== productId
            );
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error"
        })
    }
}

const clearCart = async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Authentication is required"
        })
    }

    try {

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found for user"
            })
        }

        cart.items = [];

        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Cart cleared successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error"
        })
    }
}

module.exports = { addToCart, removeFromCart, clearCart };