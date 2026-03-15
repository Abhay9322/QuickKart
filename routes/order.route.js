const express = require("express")
const {
    createOrder,
    getUserOrders,
    getOrders,
    orderStatus,
    orderHistory,
    returnRequest,
    cancelOrder,
    exchangeRequest

} = require("../controllers/order.controller")
const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/createOrder", isLoggedIn, createOrder)
router.get("/getUserOrders", isLoggedIn, getUserOrders)
router.get("/getOrders", isLoggedIn, getOrders)
router.get("/orderStatus", orderStatus)
router.get("/orderHistory", orderHistory);
router.post("/returnRequest", returnRequest);
router.put("/cancelOrder", cancelOrder);
router.put("/exchangeRequest", exchangeRequest)


module.exports = router;