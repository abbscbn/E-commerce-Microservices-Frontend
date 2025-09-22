import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function Routers() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default Routers;
