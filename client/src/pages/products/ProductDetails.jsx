import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/productApi";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data.product);
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const increaseQty = () => {
    if (qty < product.stock) {
      setQty((prev) => prev + 1);
    }
  };

  const decreaseQty = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : prev));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-600">Loading...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold text-red-500">
          Product not found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="flex shrink-0 w-full md:w-1/2">
        <img
          className="w-full h-100 object-cover rounded-lg shadow-md"
          src={product.images[0]}
          alt={product.title}
        />
      </div>
      <div className="flex flex-col justify-between md:w-1/2">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.title}
          </h1>
          <h2 className="text-2xl text-indigo-600 font-semibold mb-2">
            {product.price} RS
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Only {product.stock} items left
          </p>

          <div className="flex items-center gap-4 border rounded-lg px-4 py-2 w-fit mb-4">
            <button
              className="cursor-pointer text-2xl font-bold text-gray-600 hover:text-indigo-600 transition"
              onClick={decreaseQty}
            >
              -
            </button>
            <span className="text-xl font-semibold">{qty}</span>
            <button
              className="cursor-pointer text-2xl font-bold text-gray-600 hover:text-indigo-600 transition"
              onClick={increaseQty}
            >
              +
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="flex-1 px-5 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              Add to Cart
            </button>
            <button className="flex-1 px-5 py-2 bg-[#6C63FF] text-white rounded-lg hover:opacity-90 transition">
              Buy It Now
            </button>
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
