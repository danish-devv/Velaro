import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"
import { allProducts,productsByCategory,singleProduct,createProduct,deleteProduct,updateProduct } from "../controllers/productsController.js";

const router=express.Router();
router.get("/",allProducts)
router.get("/category/:id",productsByCategory)
router.get("/:id",singleProduct)
router.post("/",authMiddleware,adminMiddleware,createProduct)
router.delete("/:id",authMiddleware,adminMiddleware,deleteProduct)
router.patch("/:id",authMiddleware,adminMiddleware,updateProduct)

export default router