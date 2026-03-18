const express = require("express");
const {
    createProdcut,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
    getProductByName,
    filterProducts,
    getSortedProducts,
    getFeaturedProducts,
    getTrendingProducts,
    getProductStock,
    updateStock,
    getLowStockProducts
} = require("../controllers/product.controller");

const upload = require("../middlewares/upload");

const router = express.Router();


router.post("/", upload.array("images", 5), createProdcut);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.get("/search/name", getProductByName);

router.get("/filter", filterProducts);

router.get("/sort", getSortedProducts);

router.get("/featured", getFeaturedProducts);

router.get("/trending", getTrendingProducts);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get("/:id/stock", getProductStock);

router.put("/:id/stock", updateStock);

router.get("/stock/low", getLowStockProducts);

module.exports = router;