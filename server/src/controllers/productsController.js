import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import mongoose from "mongoose";
const allProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      message: "products fetched successfuly",
      products,
    });
  } catch (error) {
    next(error);
  }
};

const productsByCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid category id");
      error.statusCode = 400;
      return next(error);
    }
    const products = await productModel.find({ category: id });
    res.status(200).json({
      products,
    });
  } catch (error) {
    return next(error);
  }
};
const singleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid product id");
      error.statusCode = 400;
      return next(error);
    }
    const product = await productModel.findById(id);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      product,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      images,
      description,
      price,
      slug,
      category,
      stock,
      isActive,
      isFeatured,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(category)) {
      const error = new Error("Invalid category id");
      error.statusCode = 400;
      return next(error);
    }
    const CategoryExists = await categoryModel.findById(category);
    if (!CategoryExists) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      return next(error);
    }
    const product = await productModel.create({
      title,
      images,
      description,
      price,
      slug,
      category,
      stock,
      isActive,
      isFeatured,
    });
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid product id");
      error.statusCode = 400;
      return next(error);
    }
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new Error("Invalid product id"));
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return next(new Error("Product not found"));
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};

export {
  allProducts,
  productsByCategory,
  singleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
