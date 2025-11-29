import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authservice";

// Puedes pasar allowedRoles para rutas solo admin, etc
const PrivateRoute = ({ children, allowedRoles }) => {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirige a home o a un 403 personalizado
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default PrivateRoute;
