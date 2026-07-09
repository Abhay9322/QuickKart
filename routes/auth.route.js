const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const isLoggedIn = require("../middlewares/auth.middleware");

const { userRegistrationValidator, userLoginValidator } = require("../validators/index")
const validate = require("../middlewares/validator.middleware")

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
router.post("/register", userRegistrationValidator(), validate, register);

router.post("/login", userLoginValidator(), validate, login);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.post("/refresh-token", refreshAccessToken);

router.post("/logout", isLoggedIn, logout);
// router.post("/logout", logout);

router.put("/change-password", isLoggedIn, changePassword);

router.get("/verify-email/:token", verifyEmail);

module.exports = router;