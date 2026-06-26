import stripe from "../config/stripe.js";

const createStripeSession = async (data) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: data.lineItems,

    metadata: {
      products: JSON.stringify(data.orderItems),
      userId: data.userId,
      shippingAddress: JSON.stringify(data.shippingAddress),
      pricing: JSON.stringify(data.pricing),
    },

    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  return session;
};

export default createStripeSession;
