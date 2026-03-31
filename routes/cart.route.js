const express = require("express");

const {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal
} = require("../controllers/cart.controller");

const validate = require("../middlewares/validator.middleware");
const { addToCartValidator, removeFromCartValidator, updateCartQuantityValidator } = require("../validators/index")

const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/:productId", addToCartValidator(), validate, isLoggedIn, addToCart);

router.delete("/:productId", removeFromCartValidator(), validate, validate, isLoggedIn, removeFromCart);

router.delete("/", isLoggedIn, clearCart);

router.put("/:productId", updateCartQuantityValidator(), validate, isLoggedIn, updateCartQuantity);

router.get("/total", isLoggedIn, getCartTotal);

module.exports = router;