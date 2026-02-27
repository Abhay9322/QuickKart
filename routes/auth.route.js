const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload")
// const multer = require("multer");

const {
    register,
    login,
    getProfile,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile,
    uploadProfileImage,
    blockUser,
    unblockUser

} = require("../controllers/user.controller");
const isLoggedIn = require("../middlewares/auth.middleware")



//  Multer setup (image storage)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"), // images uploads folder me save hongi
//     filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
// });
// const upload = multer({ storage });


router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);
router.get("/profile", getProfile);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.post("/refreshAccessToken", refreshAccessToken);
router.post("/logout", logout);
router.patch("/blockUser/:id", blockUser);
router.patch("/unblockUser/:id", unblockUser);
router.post("/changePassword", changePassword);
router.post("/updateProfile", isLoggedIn, upload.single("profileImage"), updateProfile);
router.put("/uploadProfileImage", isLoggedIn, upload.single("profileImage"), uploadProfileImage);

module.exports = router;
