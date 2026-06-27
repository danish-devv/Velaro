import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Products from "../pages/products/Products";
import Categories from "../pages/categories/Categories";
import MainLayout from "../layouts/MainLayout";
import Checkout from "../pages/checkout/Checkout";
import ProtectedRoutes from "../components/ProtectedRoutes";
import AdminRoute from "../components/AdminRoute";
import Dashboard from "../pages/admin/Dashboard";
import ProductDetails from "../pages/products/ProductDetails";
import OrderSuccess from "../pages/checkout/OrderSuccess";
import OrderCancel from "../pages/checkout/OrderCancel";
import MyOrders from "../pages/user/MyOrders";
import CategoryDetails from "../pages/categories/CategoryDetails";
import CreateCategory from "../pages/admin/CreateCategory";
import CreateProduct from "../pages/admin/CreateProduct"
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="categories/:id" element={<CategoryDetails />} />

        <Route
          path="checkout"
          element={
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          }
        />

        <Route
          path="my-orders"
          element={
            <ProtectedRoutes>
              <MyOrders />
            </ProtectedRoutes>
          }
        />

        <Route
          path="success"
          element={
            <ProtectedRoutes>
              <OrderSuccess />
            </ProtectedRoutes>
          }
        />

        <Route
          path="cancel"
          element={
            <ProtectedRoutes>
              <OrderCancel />
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
        <Route
          path="categories/create"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="products/create"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
