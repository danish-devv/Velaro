import express from "express";
import getAllUsers from "../controllers/getUsersController.js";
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"

const router=express.Router()

router.get("/",authMiddleware,adminMiddleware,getAllUsers)

export default router