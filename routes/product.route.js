const express = require("express");
const { addPrdocut, modifyProduct, deleteProduct } = require("../controllers/product.controller")

const router = express.Router();

router.post("/addProduct", addPrdocut);
router.put("/modifyProduct/:id", modifyProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
