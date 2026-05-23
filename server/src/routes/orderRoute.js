import createOrder from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js"
import express from "express";
const router=express.Router()

router.post("/",authMiddleware,createOrder)

export default router