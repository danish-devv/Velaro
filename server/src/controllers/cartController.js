import cartModel from "../models/cart.model.js";

const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await cartModel.find({ user: userId }).populate("product");
    res.status(200).json({ message: "Cart fetched successfully", cart });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { product, qty } = req.body;
    const userId = req.user.id;

    let item = await cartModel.findOne({ user: userId, product });
    if (item) {
      item.qty += qty || 1;
      await item.save();
      return res
        .status(200)
        .json({ message: "Cart quantity updated", cart: item });
    }

    const newItem = await cartModel.create({ user: userId, product, qty });
    res
      .status(201)
      .json({ message: "Added to cart successfully", cart: newItem });
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { qty } = req.body;
    const userId = req.user.id;

    const updatedItem = await cartModel
      .findOneAndUpdate(
        { user: userId, product: productId },
        { qty },
        { new: true, runValidators: true },
      )
      .populate("product");

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res
      .status(200)
      .json({ message: "Cart updated successfully", updatedCart: updatedItem });
  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const deletedItem = await cartModel.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await cartModel.deleteMany({ user: userId });

    res.status(200).json({
      message: "Cart cleared successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    next(error);
  }
};

export { getCart, addToCart, updateQuantity, removeItem, clearCart };
