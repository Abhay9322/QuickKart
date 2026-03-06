const Category = require("../models/category.model");

const createCategory = async (req, res) => {
    try {
        console.log("Inside createCategory controller function");

        const { name } = req.body;

        console.log("Name is:", name);


        const exist = await Category.findOne({ name });

        if (exist) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }

        const category = await Category.create({ name });
        console.log("Category is:", category);


        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories) {
            res.status(403).json({
                success: false,
                message: "Categories not found",
                categories
            });
        }

        res.status(201).json({
            success: true,
            message: "Categories found successfully",
            categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    createCategory,
    getCategories
}