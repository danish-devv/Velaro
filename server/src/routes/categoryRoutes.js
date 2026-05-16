import { allCategories,singleCategory } from "../controllers/categoryController.js";
import express from "express";

const router=express.Router()

router.get("/",allCategories)
router.get("/:id",singleCategory)

export default router