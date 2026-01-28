const Product = require("../models/product.model")

const addPrdocut = async (req, res) => {
    try {
        const { title, description, price, quantity, stock, category } = req.body;

        if (!title || !description || !price || !category || !quantity.value || !quantity.unit) {
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
            category
        });

        console.log("Product added successfully:", product);

        return res.status(200).json({ message: "Product added successfully", })

    } catch (error) {
        console.log("Internal server error , while adding product", error);
        return res.status(500).json({ message: "Internal server error , while adding product" })

    }
}

module.exports = addPrdocut