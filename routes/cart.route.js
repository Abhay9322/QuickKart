const express = require("express")
const { addToCart } = require("../controllers/cart.controller");
const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/addToCart/:id", isLoggedIn, addToCart)

module.exports = router;