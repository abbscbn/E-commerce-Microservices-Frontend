import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Product_Details_Page from "./Product_Details_Page";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product-details" element={<Product_Details_Page />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default Routers;
