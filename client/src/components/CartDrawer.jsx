import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, loading, updateQuantity, removeItem, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-100 max-w-full bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Your Cart
            {cart.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({cart.length} {cart.length === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-4 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#6C63FF] text-white rounded-lg hover:opacity-90 transition text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex gap-4 py-4 border-b last:border-b-0"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={item.product.images?.[0] || item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-[#6C63FF] font-semibold mt-0.5">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          if (item.qty === 1) removeItem(item.product._id);
                          else updateQuantity(item.product._id, item.qty - 1);
                        }}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#6C63FF] hover:text-[#6C63FF] transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.qty + 1)
                        }
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#6C63FF] hover:text-[#6C63FF] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between shrink-0">
                    <p className="text-sm font-semibold text-gray-800">
                      ${(item.product.price * item.qty).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t px-6 py-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-lg font-bold text-gray-800">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-[#6C63FF] text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
