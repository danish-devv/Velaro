import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  if (!category) return null;

  return (
    <Link to={`/categories/${category._id}`}>
      <div className="m-5 w-60 h-80 flex flex-col shadow-md">
        <div className="h-[80%]">
          <img
            className="w-full h-full object-cover rounded-t-md"
            src={category.image}
            alt={category.name}
          />
        </div>
        <div className="h-[20%] flex flex-col justify-center items-center p-2 bg-white rounded-b-md">
          <h1 className="text-lg text-gray-600 font-semibold hover:underline">
            {category.name}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
