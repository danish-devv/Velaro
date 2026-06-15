import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { getCategoryProducts } from "../../api/productApi";
import { useParams } from "react-router-dom";

const CategoryDetails = () => {
  const { id } = useParams(); // destructure id
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await getCategoryProducts(id);
        setProducts(response.data.products || []);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <div className="text-red-500">{error}</div>;
if(products.length===0){
    return <h1 className="text-2xl text-gray-600 font-bold mb-4">No products in that category</h1>;
}
  return (
    <div className="p-6">
      <h1 className="text-gray-600 text-2xl font-bold mb-4">
        Category Products
      </h1>
      <div className="flex flex-wrap gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
