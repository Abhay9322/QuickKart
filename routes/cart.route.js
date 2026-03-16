const express = require("express")
const { addToCart, removeFromCart, updateCartQuantity, clearCart, getCartTotal } = require("../controllers/cart.controller");
const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/addToCart/:productId", isLoggedIn, addToCart)
// router.post("/addToCart", addToCart)
router.post("/removeFromCart/:id", isLoggedIn, removeFromCart)
router.post("/clearCart", isLoggedIn, clearCart)
router.put("/cart/update/:productId", updateCartQuantity);
router.get("/cart/total", getCartTotal);

module.exports = router;