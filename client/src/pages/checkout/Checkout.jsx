import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { createOrder } from "../../api/orderApi.js";
import { createCheckoutSession } from "../../api/paymentApi.js";
import { CartContext } from "../../context/CartContext.jsx";

const calculatePrice = (itemsPrice) => {
  const shippingFee = itemsPrice > 500 ? 0 : 200;
  const discountPrice = itemsPrice > 600 ? 200 : 0;
  const totalPrice = itemsPrice + shippingFee - discountPrice;
  return { shippingFee, discountPrice, totalPrice };
};

const Checkout = () => {
  const { state } = useLocation();
  const { clearCart } = useContext(CartContext);

  const fromCart = state?.fromCart || false;
  const cartItems = state?.items || [];
  const product = state?.product;
  const quantity = state?.quantity || 1;

  const [form, setForm] = useState({ fullName: "", phoneNo: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const summaryItems = fromCart
    ? cartItems.map((item) => ({
        _id: item.product._id,
        title: item.product.title,
        image: item.product.images?.[0],
        price: item.product.price,
        quantity: item.qty,
      }))
    : [
        {
          _id: product?._id,
          title: product?.title,
          image: product?.images?.[0],
          price: product?.price,
          quantity,
        },
      ];

  const itemsPrice = summaryItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const { shippingFee, discountPrice, totalPrice } = calculatePrice(itemsPrice);

  const handlePlaceOrder = async () => {
    if (!form.fullName || !form.phoneNo || !form.address) {
      setError("Please fill in all shipping details.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (paymentMethod === "COD") {
        const orderData = {
          products: summaryItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          shippingAddress: {
            fullName: form.fullName,
            phoneNo: form.phoneNo,
            address: form.address,
          },
          paymentMethod,
        };

        await createOrder(orderData);
        if (fromCart) await clearCart();
        setOrderPlaced(true);
      } else if (paymentMethod === "Stripe") {
        const productsData = {
          products: summaryItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          shippingAddress: {
            fullName: form.fullName,
            phoneNo: form.phoneNo,
            address: form.address,
          },
        };

        const { url } = await createCheckoutSession(productsData);
        window.location.href = url;
        // No need to clearCart here — handle that on your success page
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!fromCart && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No product selected.
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 max-w-md w-full text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "#7A72FF20" }}
          >
            <svg
              className="w-7 h-7"
              style={{ color: "#7A72FF" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Order placed!
          </h2>
          <p className="text-sm text-gray-400">
            Thanks, {form.fullName.split(" ")[0]}! Your order is confirmed and
            will be delivered to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-medium text-gray-900 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4 pb-3 border-b border-gray-100">
              Shipping information
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Danish Khan"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7A72FF]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1.5">
                  Phone number
                </label>
                <input
                  type="text"
                  name="phoneNo"
                  value={form.phoneNo}
                  onChange={handleChange}
                  placeholder="03001234567"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7A72FF]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1.5">
                  Delivery address
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, area, city"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7A72FF]"
                />
              </div>
            </div>

            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-6 mb-3">
              Payment method
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setPaymentMethod("COD")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all ${
                  paymentMethod === "COD"
                    ? "border-[#7A72FF] bg-[#7A72FF0D]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-xl">💵</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Cash on delivery
                  </p>
                  <p className="text-xs text-gray-400">
                    Pay when your order arrives
                  </p>
                </div>
              </button>

              {/* Stripe — now enabled */}
              <button
                onClick={() => setPaymentMethod("Stripe")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all ${
                  paymentMethod === "Stripe"
                    ? "border-[#7A72FF] bg-[#7A72FF0D]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-xl">💳</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Card payment
                  </p>
                  <p className="text-xs text-gray-400">
                    Secure checkout via Stripe
                  </p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4 pb-3 border-b border-gray-100">
              Order summary
            </h2>

            <ul className="flex flex-col gap-3 mb-4">
              {summaryItems.map((item) => (
                <li key={item._id} className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl">
                        📦
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 shrink-0">
                    $ {(item.price * item.quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>$ {itemsPrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                {shippingFee === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  <span>$ {shippingFee.toLocaleString()}</span>
                )}
              </div>

              {discountPrice > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>- $ {discountPrice.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-medium text-gray-900 pt-2 border-t border-gray-100 mt-1">
                <span>Total</span>
                <span>$ {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-5 py-3 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
              style={{ backgroundColor: "#7A72FF" }}
            >
              {loading
                ? paymentMethod === "Stripe"
                  ? "Redirecting to Stripe..."
                  : "Placing order..."
                : paymentMethod === "Stripe"
                  ? "Pay with card"
                  : "Place order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
