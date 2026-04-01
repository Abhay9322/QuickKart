const Cart = require("../models/cart.model");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/api-response");
const asyncHandler = require("../utils/async-handler");

const addToCart = asyncHandler(async (req, res) => {

    console.log("Inside addToCart controller function");

    const userId = req.user?.id;
    const { productId } = req.params;

    // auth check
    if (!userId) {
        throw new ApiError({
            statusCode: 401,
            message: "Authentication is required"
        });
    }

    // find cart
    let cart = await Cart.findOne({ user: userId });

    // create cart if not exist
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: []
        });
    }

    // check product in cart
    const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            product: productId,
            quantity: 1
        });
    }

    await cart.save();

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            success: true,
            message: "Product added to cart successfully",
            data: cart
        })
    );
});

const removeFromCart = asyncHandler(async (req, res) => {

    const userId = req.user?.id;
    const { productId } = req.body;

    if (!userId) {
        throw new ApiError({
            statusCode: 401,
            message: "Authentication is required"
        });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError({
            statusCode: 404,
            message: "Cart not found for user"
        });
    }

    const product = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (!product) {
        throw new ApiError({
            statusCode: 404,
            message: "Product not found in cart"
        });
    }

    // decrease quantity or remove item
    if (product.quantity > 1) {
        product.quantity -= 1;
    } else {
        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );
    }

    await cart.save();

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Product removed from cart successfully",
            data: cart
        })
    );
});

const updateCartQuantity = asyncHandler(async (req, res) => {

    console.log("Inside updateCartQuantity controller");

    const userId = req.user?.id;
    const { productId } = req.params;
    const { quantity } = req.body;

    // auth check
    if (!userId) {
        throw new ApiError({
            statusCode: 401,
            message: "Authentication is required"
        });
    }

    // quantity validation
    if (!quantity || quantity < 1) {
        throw new ApiError({
            statusCode: 400,
            message: "Quantity must be at least 1"
        });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError({
            statusCode: 404,
            message: "Cart not found"
        });
    }

    const product = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (!product) {
        throw new ApiError({
            statusCode: 404,
            message: "Product not found in cart"
        });
    }

    // update quantity
    product.quantity = quantity;

    await cart.save();

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Cart quantity updated successfully",
            data: cart
        })
    );
});

const clearCart = asyncHandler(async (req, res) => {

    const userId = req.user?.id;

    // auth check
    if (!userId) {
        throw new ApiError({
            statusCode: 401,
            message: "Authentication is required"
        });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError({
            statusCode: 404,
            message: "Cart not found for user"
        });
    }

    // clear all items
    cart.items = [];
    await cart.save();

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Cart cleared successfully",
            data: cart
        })
    );
});

const getCartTotal = asyncHandler(async (req, res) => {

    const userId = req.user?.id;

    // auth check
    if (!userId) {
        throw new ApiError({
            statusCode: 401,
            message: "Authentication is required"
        });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
        throw new ApiError({
            statusCode: 404,
            message: "Cart not found"
        });
    }

    // calculate total amount
    let totalAmount = 0;

    cart.items.forEach((item) => {
        const price = item.product?.price || 0; // safe check
        const quantity = item.quantity;
        totalAmount += price * quantity;
    });

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Cart fetched successfully",
            data: {
                cart,
                totalAmount
            }
        })
    );
});

module.exports = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal
};