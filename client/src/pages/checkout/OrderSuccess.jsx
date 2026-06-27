import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

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
          Payment successful
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Your order has been confirmed and will be delivered soon.
        </p>
        <button
          onClick={() => navigate("/my-orders")}
          className="block w-full py-3 text-white text-sm font-medium rounded-lg mb-3"
          style={{ backgroundColor: "#7A72FF" }}
        >
          View my orders
        </button>
        <button onClick={() => navigate("/")} className="text-sm text-gray-400">
          Back to home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
