const Product = require("../models/product.model")

const addPrdocut = async (req, res) => {
    try {
        const { title, description, price, quantity, stock, categoryID } = req.body;

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
            stock,
            category: categoryID
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
module.exports = {
    addPrdocut,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById
}