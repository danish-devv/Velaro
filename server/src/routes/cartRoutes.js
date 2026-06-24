import express from "express";
import {
  getCart,
  removeItem,
  updateQuantity,
  clearCart,
  addToCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/",authMiddleware, addToCart);
router.patch("/:productId", authMiddleware, updateQuantity);
router.delete("/", authMiddleware, clearCart);
router.delete("/:productId", authMiddleware, removeItem);

export default router;
