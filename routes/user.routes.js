const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const isLoggedIn = require("../middlewares/auth.middleware");

const { validate } = require("../middlewares/validator.middleware");
const { userIdValidator } = require("../validators/index")

const {
    getProfile,
    updateProfile,
    uploadProfileImage
} = require("../controllers/user.controller");

router.get("/profile", isLoggedIn, getProfile);

router.put("/profile", isLoggedIn, upload.single("profileImage"), updateProfile);

router.put("/profile/image", isLoggedIn, upload.single("profileImage"), uploadProfileImage);

module.exports = router; 