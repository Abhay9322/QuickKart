const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const isLoggedIn = require("../middlewares/auth.middleware");

const {
    register,
    login,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    verifyEmail
} = require("../controllers/auth.controller");

// router.post("/register", upload.single("profileImage"), register);
router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.post("/refresh-token", refreshAccessToken);

router.post("/logout", isLoggedIn, logout);

router.put("/change-password", isLoggedIn, changePassword);

router.get("/verify-email/:token", verifyEmail);

module.exports = router;