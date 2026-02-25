const express = require("express");
const multer = require("multer");
const { addPrdocut, modifyProduct, deleteProduct, getProducts } = require("../controllers/product.controller")

const router = express.Router();


// / 🔹 Multer setup (image storage)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"), // images uploads folder me save hongi
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// 🔹 POST /api/products/create
// router.post("/create", upload.single("image"), createProduct);

router.post("/addProduct", upload.single("image"), addPrdocut);
router.put("/modifyProduct/:id", modifyProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getProducts", getProducts)

module.exports = router;


