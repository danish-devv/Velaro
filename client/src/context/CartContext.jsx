import { createContext, useState, useEffect, useContext } from "react";
import {
  getCartApi,
  addToCartApi,
  updateQuantityApi,
  removeItemApi,
  clearCartApi,
} from "../api/cartApi";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getCartApi();
      setCart(response.data.cart || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]); 
    }
  }, [user]);

  const addToCart = async (id, qty) => {
    try {
      const response = await addToCartApi(id, qty);
      toast.success(response.data.message);
      await fetchCart();
      return true;
    } catch (error) {
      toast.error("Failed to add to cart");
      return false;
    }
  };

  const updateQuantity = async (productId, qty) => {
    try {
      const response = await updateQuantityApi(productId, qty);
      toast.success(response.data.message);
      await fetchCart();
      return true;
    } catch (error) {
      toast.error("Failed to update quantity");
      return false;
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await removeItemApi(productId);
      toast.success(response.data.message);
      await fetchCart();
      return true;
    } catch (error) {
      toast.error("Failed to remove item");
      return false;
    }
  };

  const clearCart = async () => {
    try {
      const response = await clearCartApi();
      toast.success(response.data.message);
      setCart([]);
      return true;
    } catch (error) {
      toast.error("Failed to clear cart");
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
