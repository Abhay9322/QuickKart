const Product = require("../models/product.model")
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/api-response");
const asyncHandler = require("../utils/async-handler");



const createProduct = asyncHandler(async (req, res) => {
    console.log("Inside createProduct Controllers");

    const { title, description, price, featured, quantity, stock, categoryID } = req.body;

    if (!title || !description || !price || !categoryID || !quantity?.value || !quantity?.unit) {
        throw new ApiError({
            statusCode: 400,
            message: "Missing required fields"
        });
    }

    const images = req.files?.map(file => ({
        url: file.path,
        public_id: file.filename
    })) || [];

    const product = await Product.create({
        title,
        description,
        price,
        quantity: {
            value: quantity.value,
            unit: quantity.unit
        },
        featured: featured || false,
        stock: stock || 0,
        category: categoryID,
        images: images
    });

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            success: true,
            message: "Product added successfully",
            data: product
        })
    );
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError({
            statusCode: 400,
            message: "productId is required"
        });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
        throw new ApiError({
            statusCode: 404,
            message: "Product not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        })
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError({
            statusCode: 400,
            message: "ProductId is required"
        });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        throw new ApiError({
            statusCode: 404,
            message: "Product not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct
        })
    );
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate("category");

    if (!products || products.length === 0) {
        throw new ApiError({
            statusCode: 404,
            message: "Products not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Products fetched successfully",
            data: products
        })
    );
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
        throw new ApiError({
            statusCode: 404,
            message: "Product not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Product fetched successfully",
            data: product
        })
    );
});

const getProductByName = asyncHandler(async (req, res) => {
    const { productName } = req.body;

    if (!productName) {
        throw new ApiError({
            statusCode: 400,
            message: "productName is required"
        });
    }

    const product = await Product.findOne({
        title: { $regex: productName, $options: "i" }
    }).populate("category");

    if (!product) {
        throw new ApiError({
            statusCode: 404,
            message: "Product not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Product fetched successfully",
            data: product
        })
    );
});

const filterProducts = asyncHandler(async (req, res) => {
    const { minPrice, maxPrice } = req.body;

    if (minPrice == null || maxPrice == null) {
        throw new ApiError({
            statusCode: 400,
            message: "minPrice and maxPrice are required"
        });
    }

    const products = await Product.find({
        price: { $gt: minPrice, $lt: maxPrice }
    }).populate("category");

    if (!products || products.length === 0) {
        throw new ApiError({
            statusCode: 404,
            message: "No products found in the given price range"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Products fetched successfully",
            data: products
        })
    );
});

const getSortedProducts = asyncHandler(async (req, res) => {
    const { sort } = req.query;

    let sortOption = {};

    switch (sort) {
        case "priceLowHigh":
            sortOption = { price: 1 };
            break;
        case "priceHighLow":
            sortOption = { price: -1 };
            break;
        case "rating":
            sortOption = { rating: -1 };
            break;
        case "newest":
            sortOption = { createdAt: -1 };
            break;
        default:
            sortOption = { createdAt: -1 };
    }

    const products = await Product.find().sort(sortOption).populate("category");

    if (!products || products.length === 0) {
        throw new ApiError({
            statusCode: 404,
            message: "No products found for the given sort option"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Products fetched and sorted successfully",
            count: products.length,
            data: products
        })
    );
});

const getFeaturedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ featured: true }).populate("category");

    if (!products || products.length === 0) {
        throw new ApiError({
            statusCode: 404,
            message: "Featured products not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Featured products fetched successfully",
            count: products.length,
            data: products
        })
    );
});

const getTrendingProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort({ sold: -1 }).limit(5).populate("category");

    if (!products || products.length === 0) {
        throw new ApiError({
            statusCode: 404,
            message: "Trending products not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Trending products fetched successfully",
            count: products.length,
            data: products
        })
    );
});

const getProductStock = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError({
            statusCode: 404,
            message: "Product not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Product stock fetched successfully",
            data: { stock: product.stock }
        })
    );
});

const updateStock = asyncHandler(async (req, res) => {
    const { stock } = req.body;

    if (stock == null) {
        throw new ApiError({
            statusCode: 400,
            message: "Stock value is required"
        });
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        { stock },
        { new: true }
    );

    if (!product) {
        throw new ApiError({
            statusCode: 404,
            message: "Product not found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Stock updated successfully",
            data: product
        })
    );
});

const getLowStockProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ stock: { $lt: 10 } });

    if (!products || products.length === 0) {
        throw new ApiError({
            statusCode: 404,
            message: "No low stock products found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Low stock products fetched successfully",
            data: products
        })
    );
});


module.exports = {
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
}