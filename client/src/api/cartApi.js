import api from "./axios";

const getCartApi = () => api.get("/cart");

const addToCartApi = (id, qty) =>
  api.post("/cart", {
    product: id,
    qty,
  });

const updateQuantityApi = (productId, qty) =>
  api.patch(`/cart/${productId}`, { qty });

const removeItemApi = (productId) => api.delete(`/cart/${productId}`);

const clearCartApi = () => api.delete("/cart");

export {
  getCartApi,
  addToCartApi,
  updateQuantityApi,
  removeItemApi,
  clearCartApi,
};
