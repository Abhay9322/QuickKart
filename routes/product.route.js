const express = require("express");
const {
    addPrdocut,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductByName,
    filterProducts,
    getSortedProducts,
    getFeaturedProducts,
    getTrendingProducts,
    getProductStock,
    updateStock,
    getLowStockProducts
} = require("../controllers/product.controller")
const upload = require("../middlewares/upload")

const router = express.Router();

// router.post("/addProduct", addPrdocut);
router.post(
    "/addProduct",
    upload.array("images", 5),
    addPrdocut
);
// router.post(
//     "/products",
//     upload.array("images", 5),
//     createProduct
// );
router.put("/modifyProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getProducts", getProducts)
router.get("/getProductByName", getProductByName)
router.get("/filterProduct", filterProducts)
router.get("/getSortedProducts", getSortedProducts)
router.get("/getFeaturedProducts", getFeaturedProducts)
router.get("/getTrendingProducts", getTrendingProducts)
router.get("/getProductStock/:id", getProductStock)
router.put("/updateStock/:id", updateStock)
router.get("/getLowStockProducts", getLowStockProducts)


module.exports = router;
