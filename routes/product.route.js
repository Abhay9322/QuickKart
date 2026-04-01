const express = require("express");

const {
    createProduct,
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

const validate = require("../middlewares/validator.middleware");
const { productCreateValidator, productIdValidator } = require("../validators/index")


const upload = require("../middlewares/upload.middleware");

const router = express.Router();


router.post("/", upload.array("images", 5), createProduct);
// router.post("/", productCreateValidator(), validate, upload.array("images", 5), createProduct);

router.get("/", getProducts);

router.get("/:id", productIdValidator(), validate, getProductById);

router.get("/search/name", getProductByName);

router.get("/filter", filterProducts);

router.get("/sort", getSortedProducts);

router.get("/featured", getFeaturedProducts);

router.get("/trending", getTrendingProducts);

router.put("/:id", productIdValidator(), validate, updateProduct);

router.delete("/:id", productIdValidator(), validate, deleteProduct);

router.get("/:id/stock", productIdValidator(), validate, getProductStock);

router.put("/:id/stock", productIdValidator(), validate, updateStock);

router.get("/stock/low", getLowStockProducts);

module.exports = router;