import mongoose from "mongoose";
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
        message:"Category fetched successfuly",
      category,
    });
  } catch (error) {
    next(error);
  }
};

export { allCategories, singleCategory };
