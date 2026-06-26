import api from "./axios.js";

export const createCheckoutSession = async (productsData) => {
  try {
    const response = await api.post("/payments/checkout-session", productsData);

    return response.data;
  } catch (error) {
    console.log(
      "Payment API Error:",
      error.response?.data?.message || error.message,
    );
    throw error;
  }
};
