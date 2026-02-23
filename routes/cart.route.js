const express = require("express")
const { addToCart, removeFromCart, clearCart } = require("../controllers/cart.controller");
const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/addToCart/:productId", isLoggedIn, addToCart)
// router.post("/addToCart", addToCart)
router.post("/removeFromCart/:id", isLoggedIn, removeFromCart)
router.post("/clearCart", isLoggedIn, clearCart)

module.exports = router;