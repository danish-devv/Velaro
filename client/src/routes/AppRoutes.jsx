import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/auth/Register"
import Login from "../pages/auth/Login";
import Products from "../pages/products/Products"
import Categories from "../pages/categories/Categories"
import MainLayout from "../layouts/MainLayout";
import Checkout from "../pages/checkout/Checkout";
import ProtectedRoutes from "../components/ProtectedRoutes"
import AdminRoute from "../components/AdminRoute";
import Dashboard from "../pages/admin/Dashboard";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          }
        />
        <Route
          path="dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
