import banner from "../../assets/images/Gemini_Generated_Image_4ouokv4ouokv4ouo.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full h-64 md:h-112 overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src={banner}
        alt="Store Banner"
      />

      <div className="absolute inset-0 bg-black/30 flex items-center">
        <div className="ml-10 text-white max-w-xl">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-snug drop-shadow-lg">
            Discover Premium Products
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-200">
            Shop quality products with a seamless shopping experience.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#6C63FF] text-white rounded-lg font-semibold shadow-md hover:bg-[#5a52d6] transition"
            >
              Shop Now
            </Link>
            <Link
              to="/explore"
              className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#6C63FF] transition"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
