const express = require("express");

const { createCategory, getCategories } = require("../controllers/category.controller");

const validate = require("../middlewares/validator.middleware");
const { categoryValidator } = require("../validators/index")


const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", categoryValidator(), validate, isLoggedIn, createCategory);

router.get("/", getCategories);

module.exports = router;