import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Products from "../pages/products/Products"
import Categories from "../pages/categories/Categories"
import MainLayout from "../layouts/MainLayout";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="products" element={<Products/>}/>
        <Route path="categories" element={<Categories/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
