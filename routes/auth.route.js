const express = require("express");
const multer = require("multer");
const {
    register,
    login,
    getProfile,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    changePassword
} = require("../controllers/user.controller");


const router = express.Router();


//  Multer setup (image storage)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"), // images uploads folder me save hongi
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });


router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);
router.get("/profile", getProfile);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.post("/refreshAccessToken", refreshAccessToken);
router.post("/logout", logout);
router.post("/changePassword", changePassword);

module.exports = router;
