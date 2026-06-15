import { useState, useEffect } from "react";
import CategoryCard from "../../components/CategoryCard";
import { getCategories } from "../../api/productApi";

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg p-4 shadow">
    <div className="bg-gray-200 h-32 w-full rounded-md"></div>
    <div className="mt-4 space-y-2">
      <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
      <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
    </div>
  </div>
);

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategories();
        setCategories(response?.data?.categories || []);
      } catch (err) {
        setError("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Categories</h1>

      {error && <div className="text-red-500 font-medium mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {loading
          ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          : categories.map((category) =>
              category ? (
                <CategoryCard key={category._id} category={category} />
              ) : null,
            )}
      </div>
    </div>
  );
};

export default Categories;
