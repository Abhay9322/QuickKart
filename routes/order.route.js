const express = require("express");

const {
    createOrder,
    getUserOrders,
    getOrders,
    orderStatus,
    orderHistory,
    returnRequest,
    cancelOrder,
    exchangeRequest,
    getOrderById
} = require("../controllers/order.controller");

const isLoggedIn = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validator.middleware");
const { userIdValidator, createOrderValidator, orderIdParamValidator, userOrderHistoryValidator, returnExchangeValidator } = require("../validators/index")


const router = express.Router();

router.post("/", createOrderValidator(), validate, isLoggedIn, createOrder);

// router.get("/", userIdValidator(), validate, getUserOrders);

// router.get("/", isLoggedIn, getOrders);
router.get("/", getOrders);

router.get("/:id/status", orderIdParamValidator(), validate, isLoggedIn, orderStatus);

router.get("/history", userOrderHistoryValidator(), validate, isLoggedIn, orderHistory);

router.post("/:id/return", returnExchangeValidator(), validate, isLoggedIn, returnRequest);

router.put("/:id/cancel", orderIdParamValidator(), validate, isLoggedIn, cancelOrder);

router.put("/:id/exchange", returnExchangeValidator(), validate, isLoggedIn, exchangeRequest);

router.get("/:id", isLoggedIn, getOrderById);

module.exports = router;