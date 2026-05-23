import orderModel from "../models/order.Model.js";
import productModel from "../models/product.model.js";

const calculatePrice = (items) => {
  let itemsPrice = 0;

  items.forEach((item) => {
    itemsPrice += item.price * item.quantity;
  });

  const shippingFee = itemsPrice > 1500 ? 0 : 200;
  const discount = itemsPrice > 2000 ? 200 : 0;

  const totalPrice = itemsPrice + shippingFee - discount;

  return {
    itemsPrice,
    shippingFee,
    discount,
    totalPrice,
  };
};

const createOrder = async (req, res, next) => {
  try {
    const id = req.user.id;

    const { products, shippingAddress, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      const error = new Error("No product selected");
      error.statusCode = 400;
      return next(error);
    }

    // extract ids
    const productIds = products.map((item) => item.productId);

    // fetch products from DB
    const dbProducts = await productModel.find({
      _id: { $in: productIds },
    });

    if (dbProducts.length !== products.length) {
      const error = new Error("Some products not found");
      error.statusCode = 400;
      return next(error);
    }

    // create order items snapshot
    const orderItems = products.map((item) => {
      const product = dbProducts.find(
        (p) => p._id.toString() === item.productId,
      );

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.title}`);
      }

      return {
        productId: product._id,
        title: product.title,
        quantity: item.quantity,
        price: product.price,
      };
    });

    // calculate prices
    const pricing = calculatePrice(orderItems);

    // create order
    const order = await orderModel.create({
      userId: id,
      products: orderItems,
      shippingAddress,
      payment: {
        method: paymentMethod,
        paymentStatus: "pending",
        transactionId: null,
      },
      pricing,
      status: "processing",
    });

    // reduce stock
    for (let item of orderItems) {
      await productModel.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export default createOrder;
