const express = require("express")
const { createOrder, getUserOrders, getOrders } = require("../controllers/order.controller")
const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/createOrder", isLoggedIn, createOrder)
router.get("/getUserOrders", isLoggedIn, getUserOrders)
router.get("/getOrders", isLoggedIn, getOrders)

module.exports = router;