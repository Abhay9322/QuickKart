const express = require("express");

const { blockUser, unblockUser } = require("../controllers/admin.controller");

const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.patch("/users/:id/block", isLoggedIn, blockUser);

router.patch("/users/:id/unblock", isLoggedIn, unblockUser);

module.exports = router;
