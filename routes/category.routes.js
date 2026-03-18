const express = require("express");

const { createCategory, getCategories } = require("../controllers/category.controller");

const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", isLoggedIn, createCategory);

router.get("/", getCategories);

module.exports = router;