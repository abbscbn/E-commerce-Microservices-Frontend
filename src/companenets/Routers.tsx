import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Product_Details_Page from "./Product_Details_Page";
import AdminLogin from "./AdminLogin";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "./admin/AdminLayout";
import DashboardHome from "../pages/admin/DashboardHome";
import ProductList from "../pages/admin/ProductList";
import ProductFormWrapper from "../pages/admin/ProductFormWrapper";
import BasketPage from "./BasketPage";
function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminLogin />} />
        {/* Admin Panel Routing */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute role="ADMIN">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductFormWrapper />} />
          <Route path="products/edit/:id" element={<ProductFormWrapper />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product-details" element={<Product_Details_Page />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default Routers;
