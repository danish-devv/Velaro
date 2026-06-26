import { useState, useEffect } from "react";
import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg p-4 shadow">
    <div className="bg-gray-200 h-32 w-full rounded-md"></div>
    <div className="mt-4 space-y-2">
      <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
      <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
    </div>
  </div>
);

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data.products);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Featured Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-semibold text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
