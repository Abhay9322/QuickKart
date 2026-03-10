const Product = require("../models/product.model")

const addPrdocut = async (req, res) => {
    try {
        const { title, description, price, featured, quantity, stock, categoryID } = req.body;

        // // uploaded images ko array me convert karna
        // const images = req.files.map(file => ({
        //     url: file.path,        // cloudinary image url
        //     public_id: file.filename  // cloudinary public id
        // }));

        const images = req.files?.map(file => ({
            url: file.path,
            public_id: file.filename
        })) || [];

        if (!title || !description || !price || !categoryID || !quantity.value || !quantity.unit) {
            return res.status(400).json({ message: "Missing required fields" })
        }


        const product = await Product.create({
            title,
            description,
            price,
            quantity: {
                value: quantity.value,
                unit: quantity.unit
            },
            featured: featured,
            stock,
            category: categoryID,
            images: images
        });

        console.log("Product added successfully:", product);

        res.status(200).json({ message: "Product added successfully", })

    } catch (error) {
        console.log("Internal server error , while adding product", error);
        return res.status(500).json({ message: "Internal server error , while adding product" })

    }
}

const updateProduct = async (req, res) => {
    try {
        console.log("Inside ModifyOrder Request");

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "productId is required" })
        }

        const updatetedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true })

        if (!updatetedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }

        console.log("Product Modified Successfully", updatetedProduct);

        res.status(200).json({ message: "Product Modified Successfully", data: updatetedProduct })

    } catch (error) {
        console.log("Error occurred while modifing product", error);
        return res.status(500).json({ message: "Internal Server while modifying product" })

    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: "ProductId is required" })
        }

        const deletedProduct = await Product.findByIdAndDelete(id, { new: true });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }

        console.log("Product deleted successfully", deletedProduct)

        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        console.log("Error occurred while deleting product", error);
        return res.status(500).json({ message: "Internal Server while while deleting product" })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');

        if (!products) {
            return res.status(400).json({ message: "Products not found" })
        }

        res.status(200).json({ message: "Product fetched successfully", data: products })
    } catch (error) {
        return res.status(500).json({ message: "Internal server while fetching products" })
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");

        if (!product) {
            return res.status(400).json({ message: "Products not found" })
        };

        res.status(200).json({ message: "Product fetched successfully", data: product })

    } catch (error) {
        return res.status(500).json({ message: "Internal server while fetching product details" })
    }
}

const getProductByName = async (req, res) => {
    try {
        console.log("Inside getProductByName controller");

        const { productName } = req.body;


        if (!productName) {
            return res.status(400).json({ message: "productName is required" })
        }

        const product = await Product.findOne({ title: { $regex: productName, $options: "i" } });

        if (!product) {
            return res.status(400).json({ message: "product not found" })
        }
        res.status(200).json({ message: "Product fetched successfully", data: product })

    } catch (error) {
        return res.status(500).json({ message: "Internal server while fetching product details" })
    }
}

const filterProducts = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.body;

        if (!minPrice || !maxPrice) {
            return res.status(400).json({ message: "minPrice and maxPrice are required" })
        }

        const products = await Product.find({
            price: { $gt: minPrice, $lt: maxPrice }
        });

        res.status(200).json({ message: "Products fetched successfully", data: products })
    } catch (error) {
        return res.status(500).json({ message: "Internal server while fetching products details" })
    }
}

const getSortedProducts = async (req, res) => {
    try {

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

        const products = await Product.find().sort(sortOption);

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ featured: true });

        if (!products || products.length == 0) {
            return res.status(400).json({ message: "featured products not found" })
        }

        res.status(200).json({ message: "featured products fetched successfully", data: products })
    } catch (error) {
        return res.status(500).json({ message: "Internal server while fetching featured products" })
    }
}

const getTrendingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ sold: -1 }).limit(5);

        if (!products) {
            return res.status(400).json({ message: "Trending products not found" })
        }
        res.status(200).json({ message: "Trending products fetched successfully", data: products })
    } catch (error) {
        return res.status(500).json({ message: "Internal server while fetching products" })
    }
}

const getProductStock = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            stock: product.stock
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const updateStock = async (req, res) => {

    try {

        const { stock } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { stock },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Stock updated",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getLowStockProducts = async (req, res) => {

    try {

        const products = await Product.find({
            stock: { $lt: 10 }
        });

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addPrdocut,
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