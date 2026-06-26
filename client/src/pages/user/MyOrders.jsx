import React, { useState, useEffect } from "react";
import { getMyOrders } from "../../api/orderApi.js";
import { Package, ChevronDown, ChevronUp } from "lucide-react";

const statusColors = {
  processing: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await getMyOrders();

        setOrders(res?.orders || []);
        setError(null);
      } catch (err) {
        setError("Failed to load orders.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpand = (id) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Package size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No orders yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Order ID</span>
                    <span className="font-mono text-sm font-semibold">
                      #{order.id.slice(-8).toUpperCase()}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600">
                    {formatDate(order.createdAt)}
                  </div>

                  <div className="font-bold text-gray-800">
                    ${order.totalPrice}
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize ${
                      statusColors[order.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>

                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="text-[#6C63FF]"
                  >
                    {expandedOrder === order.id ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>
                </div>

                {expandedOrder === order.id && (
                  <div className="border-t bg-gray-50 px-5 py-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between bg-white p-3 rounded-lg mb-2"
                      >
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <div className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
