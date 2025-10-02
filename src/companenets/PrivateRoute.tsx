import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface PrivateRouteProps {
  children: React.ReactElement; //JSX.Element;
  role?: string; // opsiyonel olarak rol kontrolü
}

function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (role && !user?.roles?.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default PrivateRoute;
