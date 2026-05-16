import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
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
    const product = await productModel.findById(id);
    if (!product) {
      const error = new Error("No product");
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

export { allProducts, productsByCategory, singleProduct };
