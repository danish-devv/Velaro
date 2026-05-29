import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import {
  allProducts,
  productsByCategory,
  singleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productsController.js";

const router = express.Router();
router.get("/", allProducts);
router.get("/category/:id", productsByCategory);
router.get("/:id", singleProduct);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 5),
  createProduct,
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 5),
  updateProduct,
);

export default router;
