const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload")
// const multer = require("multer");

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
const isLoggedIn = require("../middlewares/auth.middleware")


router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.post("/refreshAccessToken", refreshAccessToken);
router.post("/logout", isLoggedIn, logout);
router.post("/changePassword", isLoggedIn, changePassword);
router.get("/verify-email/:token", verifyEmail);

module.exports = router;
