import express from "express";
const router=express.Router();
import { allProducts,productsByCategory,singleProduct } from "../controllers/productsController.js";

router.get("/",allProducts)
router.get("/category/:id",productsByCategory)
router.get("/:id",singleProduct)

export default router