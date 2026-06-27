import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`}>
      <div className="m-5 w-60 h-80 flex flex-col shadow-md ">
        {/* Image section (70%) */}
        <div className="h-[70%]">
          <img
            className="w-full h-full object-cover rounded-t-md "
            src={product.images?.[0]}
            alt="Product"
          />
        </div>
        {/* Text section (30%) */}
        <div className="h-[30%] flex flex-col justify-center items-center p-2 bg-white rounded-b-md">
          <h1 className="text-lg text-gray-600 font-semibold hover:underline">
            {product.title}
          </h1>
          <h2 className="text-md text-gray-600">{product.price}$</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
