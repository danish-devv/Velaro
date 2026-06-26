import createStripeSession from "../services/stripe.service.js";
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

const createCheckoutSession = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { products, shippingAddress } = req.body;

    if (!products || products.length === 0) {
      const error = new Error("No product selected");
      error.statusCode = 400;
      throw error;
    }

    const productIds = products.map((item) => item.productId);

    const dbProducts = await productModel.find({
      _id: { $in: productIds },
    });

    if (dbProducts.length !== products.length) {
      const error = new Error("Some products not found");
      error.statusCode = 400;
      throw error;
    }

    const orderItems = products.map((item) => {
      const product = dbProducts.find(
        (p) => p._id.toString() === item.productId,
      );

      if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
      }

      if (product.stock < item.quantity) {
        const error = new Error(`Not enough stock for ${product.title}`);
        error.statusCode = 400;
        throw error;
      }

      return {
        productId: product._id,
        title: product.title,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const pricing = calculatePrice(orderItems);

    const lineItems = orderItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await createStripeSession({
      lineItems,
      userId,
      shippingAddress,
      pricing,
      orderItems,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
};

export default createCheckoutSession;
