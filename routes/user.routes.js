const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const isLoggedIn = require("../middlewares/auth.middleware");

const {
    getProfile,
    updateProfile,
    uploadProfileImage
} = require("../controllers/user.controller");

router.get("/profile", isLoggedIn, getProfile);

router.put("/profile", isLoggedIn, upload.single("profileImage"), updateProfile);

router.put("/profile/image", isLoggedIn, upload.single("profileImage"), uploadProfileImage);

module.exports = router; 