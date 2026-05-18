import mongoose, { mongo } from "mongoose";
import categoryModel from "../models/category.model.js";

const allCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json({
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const singleCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid category id");
      error.statusCode = 400;
      return next(error);
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "Category fetched successfuly",
      category,
    });
  } catch (error) {
    next(error);
  }
};
const createCategory = async (req, res, next) => {
  try {
    const { name, slug, description, image, isActive } = req.body;
    if (!name || !slug) {
      const error = new Error("name and slug are required");
      error.statusCode = 400;
      return next(error);
    }
    const category = await categoryModel.create({
      name,
      slug,
      description,
      image,
      isActive,
    });
    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    return next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid category id");
      error.statusCode = 400;
      return next(error);
    }
    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid category Id");
      error.statusCode = 400;
      return next(error);
    }
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!updatedCategory) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      next(error);
    }
    res.status(200).json({
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    return next(error);
  }
};
export {
  allCategories,
  singleCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
