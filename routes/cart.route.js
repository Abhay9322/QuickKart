import expres from "express";
import addToCart from "../controllers/cart.controller.js";

const router = expres.Router();

router.post("/addToCart", addToCart)

export default router