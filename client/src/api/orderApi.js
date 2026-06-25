import api from "./axios";

const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export default createOrder;
