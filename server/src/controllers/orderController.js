import orderModel from "../models/order.Model.js";
import productModel from "../models/product.model.js";

const calculatePrice = (items) => {
  let itemsPrice = 0;

  items.forEach((item) => {
    itemsPrice += item.price * item.quantity;
  });

  const shippingFee = itemsPrice > 500 ? 0 : 200;
  const discountPrice = itemsPrice > 600 ? 200 : 0;

  const totalPrice = itemsPrice + shippingFee - discountPrice;

  return {
    itemsPrice,
    shippingFee,
    discountPrice,
    totalPrice,
  };
};
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { products, shippingAddress, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      const error = new Error("No product selected");
      error.statusCode = 400;
      return next(error);
    }

    const productIds = products.map((item) => item.productId);

    const dbProducts = await productModel.find({
      _id: { $in: productIds },
    });

    if (dbProducts.length !== products.length) {
      const error = new Error("Some products not found");
      error.statusCode = 400;
      return next(error);
    }

    const orderItems = products.map((item) => {
      const product = dbProducts.find(
        (p) => p._id.toString() === item.productId,
      );

      if (item.quantity < 1) {
        throw new Error("Invalid quantity");
      }

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.title}`);
      }

      return {
        productId: product._id,
        title: product.title,
        // image: product.image,
        price: product.price,
        quantity: item.quantity,
      };
    });

    const pricing = calculatePrice(orderItems);

    const order = await orderModel.create({
      userId,
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

    for (const item of orderItems) {
      await productModel.findByIdAndUpdate(item.productId, {
        $inc: {
          stock: -item.quantity,
        },
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

 const getMyOrders = async (req, res, next) => {
  try {
    console.log("USER:", req.user.id);
    const userId = req.user.id;
    const orders = await orderModel.find({ userId });

    const formattedOrders = orders.map((order) => ({
      id: order._id,
      status: order.status,
      createdAt: order.createdAt,
      totalPrice: order.pricing.totalPrice,
      items: order.products.map((p) => ({
        productId: p.productId,
        title: p.title,
        price: p.price,
        quantity: p.quantity,
      })),
    }));

    res.json({
      success: true,
      orders: formattedOrders,
    });
  } catch (error) {
    next(error);
  }
};



export {createOrder,getMyOrders};
