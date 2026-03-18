const express = require("express");

const {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal
} = require("../controllers/cart.controller");

const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/:productId", isLoggedIn, addToCart);

router.delete("/:productId", isLoggedIn, removeFromCart);

router.delete("/", isLoggedIn, clearCart);

router.put("/:productId", isLoggedIn, updateCartQuantity);

router.get("/total", isLoggedIn, getCartTotal);

module.exports = router;