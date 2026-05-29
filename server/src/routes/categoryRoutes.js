import {
  allCategories,
  singleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import upload from "../middlewares/multer.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/", allCategories);
router.get("/:id", singleCategory);
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createCategory,
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateCategory,
);
export default router;
