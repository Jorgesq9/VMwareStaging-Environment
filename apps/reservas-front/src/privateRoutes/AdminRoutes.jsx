import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/authservice";

/**
 * Ruta protegida solo para administradores.
 * Redirige y pasa un mensaje de acceso denegado.
 */
const AdminRoute = ({ children }) => {
  const user = getCurrentUser();
  const location = useLocation();

  if (!user) {
    // Redirige al login y pasa mensaje por el estado
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, error: "Debes iniciar sesión para acceder." }}
      />
    );
  }

  if (user.role !== "admin") {
    // Redirige al home y pasa mensaje por el estado
    return (
      <Navigate
        to="/"
        replace
        state={{
          from: location,
          error: "Acceso denegado: solo para administradores.",
        }}
      />
    );
  }

  return children;
};

export default AdminRoute;
