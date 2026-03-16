const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload")
// const multer = require("multer");

const {
    blockUser,
    unblockUser

} = require("../controllers/admin.controller");
const isLoggedIn = require("../middlewares/auth.middleware")


router.patch("/blockUser/:id", blockUser);
router.patch("/unblockUser/:id", unblockUser);

module.exports = router;
