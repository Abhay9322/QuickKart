const express = require("express");
const addPrdocut = require("../controllers/product.controller")

const router = express.Router();

router.post("/addProduct", addPrdocut);

module.exports = router;
