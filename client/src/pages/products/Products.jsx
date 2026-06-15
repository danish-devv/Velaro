import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import ProductCard from "../../components/ProductCard";

const SkeletonProductCard = () => (
  <div className="animate-pulse bg-white rounded-lg p-4 shadow w-64">
    <div className="bg-gray-200 h-40 w-full rounded-md"></div>
    <div className="mt-4 space-y-2">
      <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
      <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
    </div>
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.products);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">All Products</h1>

      {error && <p className="text-red-500 font-medium mb-4">{error}</p>}

      <div className="flex flex-wrap gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => <SkeletonProductCard key={i} />)
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
