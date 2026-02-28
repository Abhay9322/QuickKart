const express = require("express")
const { createCategory, getCategories } = require("../controllers/category.controller");
const isLoggedIn = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/createCategory", isLoggedIn, createCategory)
router.get("/getCategories", isLoggedIn, getCategories)


module.exports = router;