import Hero from "../../components/Hero";
import FeaturedProducts from "../../components/FeaturedProducts";
import Categories from "../categories/Categories";
const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      
      <Categories />
    </div>
  );
};

export default Home;
