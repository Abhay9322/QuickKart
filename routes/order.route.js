const express = require("express");

const {
    createOrder,
    getUserOrders,
    getOrders,
    orderStatus,
    orderHistory,
    returnRequest,
    cancelOrder,
    exchangeRequest
} = require("../controllers/order.controller");

const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", isLoggedIn, createOrder);

router.get("/my-orders", isLoggedIn, getUserOrders);

router.get("/", isLoggedIn, getOrders);

router.get("/:id/status", isLoggedIn, orderStatus);

router.get("/history", isLoggedIn, orderHistory);

router.post("/:id/return", isLoggedIn, returnRequest);

router.put("/:id/cancel", isLoggedIn, cancelOrder);

router.put("/:id/exchange", isLoggedIn, exchangeRequest);

module.exports = router;