const express = require("express");
const { addPrdocut, updateProduct, deleteProduct, getProducts } = require("../controllers/product.controller")

const router = express.Router();

router.post("/addProduct", addPrdocut);
router.put("/modifyProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getProducts", getProducts)

module.exports = router;
