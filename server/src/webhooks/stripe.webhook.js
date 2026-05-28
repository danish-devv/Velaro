import stripe from "../config/stripe.js";
import orderModel from "../models/order.Model.js";

const stripeWebhook = async (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    const err = new Error("Webhook verification failed");
    err.statusCode = 400;
    return next(err);
  }

  if (event.type === "checkout.session.completed") {
    console.log("payment successful");
    const session = event.data.object;

    const userId = session.metadata.userId;
    const shippingAddress = JSON.parse(
      session.metadata.shippingAddress || "{}",
    );
    const pricing = JSON.parse(session.metadata.pricing || "{}");
    const products = JSON.parse(session.metadata.products || "[]");

    try {
      await orderModel.create({
        userId,
        products,
        shippingAddress,
        pricing,
        payment: {
          method: "STRIPE",
          paymentStatus: "completed",
          transactionId: session.payment_intent,
        },
        status: "processing",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Order creation failed",
      });
    }
  }

  return res.status(200).json({
    received: true,
  });
};

export default stripeWebhook;
