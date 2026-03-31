const express = require("express");

const { blockUser, unblockUser } = require("../controllers/admin.controller");

const { blockUserValidator, unblockUserValidator } = require("../validators/index")
const validate = require("../middlewares/validator.middleware")

const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.patch("/users/:id/block", blockUserValidator, validate, isLoggedIn, blockUser);

router.patch("/users/:id/unblock", unblockUserValidator, validate, isLoggedIn, unblockUser);

module.exports = router;
