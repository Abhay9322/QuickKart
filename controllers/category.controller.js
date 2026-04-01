const Category = require("../models/category.model");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/api-response");
const asyncHandler = require("../utils/async-handler");

const createCategory = asyncHandler(async (req, res) => {

    console.log("Inside createCategory controller function");

    const { name } = req.body;

    if (!name || name.trim() === "") {
        throw new ApiError({
            statusCode: 400,
            message: "Category name is required"
        });
    }

    const exist = await Category.findOne({ name });

    if (exist) {
        throw new ApiError({
            statusCode: 400,
            message: "Category already exists"
        });
    }

    const category = await Category.create({ name: name.trim() });

    return res.status(201).json(
        new ApiResponse({
            statusCode: 201,
            success: true,
            message: "Category created successfully",
            data: category
        })
    );
});


const getCategories = asyncHandler(async (req, res) => {

    const categories = await Category.find();

    if (!categories || categories.length === 0) {
        throw new ApiError({
            statusCode: 404,
            message: "No categories found"
        });
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            success: true,
            message: "Categories fetched successfully",
            data: categories
        })
    );
});

module.exports = {
    createCategory,
    getCategories
}