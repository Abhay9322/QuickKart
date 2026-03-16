const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload")
// const multer = require("multer");

const {
    getProfile,
    updateProfile,
    uploadProfileImage,

} = require("../controllers/user.controller");
const isLoggedIn = require("../middlewares/auth.middleware")



router.get("/profile", getProfile);
router.post("/updateProfile", isLoggedIn, upload.single("profileImage"), updateProfile);
router.put("/uploadProfileImage", isLoggedIn, upload.single("profileImage"), uploadProfileImage);

module.exports = router;
