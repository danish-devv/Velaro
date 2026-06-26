import api from "./axios";

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const getMyOrders = async () => {
  try {
    const response = await api.get("/orders/my-orders");
    return response.data;
  } catch (error) {
    console.log("API ERROR:", error.response?.data || error.message);
    throw error;
  }
};
