import stripe from "../config/stripe.js";
import orderModel from "../models/order.Model.js";
import productModel from "../models/product.model.js";

const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log("WEBHOOK ERROR:", error.message);
    return res.status(400).send(error.message);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;
    const shippingAddress = JSON.parse(
      session.metadata.shippingAddress || "{}",
    );
    const pricing = JSON.parse(session.metadata.pricing || "{}");
    const products = JSON.parse(session.metadata.products || "[]");

    try {
      const existingOrder = await orderModel.findOne({
        "payment.transactionId": session.id,
      });

      if (existingOrder) {
        return res.status(200).json({ received: true });
      }

      const order = await orderModel.create({
        userId,
        products,
        shippingAddress,
        pricing,
        payment: {
          method: "STRIPE",
          paymentStatus: "paid",
          transactionId: session.id,
        },
        status: "processing",
      });

      for (const item of products) {
        await productModel.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });
      }
    } catch (error) {
      console.log("ORDER CREATION ERROR:", error.message);
      return res.status(500).json({
        message: "Order creation failed",
      });
    }
  }

  return res.status(200).json({ received: true });
};

export default stripeWebhook;
