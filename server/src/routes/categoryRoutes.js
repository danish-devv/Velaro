import { allCategories,singleCategory,createCategory,updateCategory,deleteCategory } from "../controllers/categoryController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import express from "express";

const router=express.Router()

router.get("/",allCategories)
router.get("/:id",singleCategory)
router.post("/",authMiddleware,adminMiddleware,createCategory)
router.delete("/:id",authMiddleware,adminMiddleware,deleteCategory)
router.patch("/:id",authMiddleware,adminMiddleware,updateCategory)
export default router