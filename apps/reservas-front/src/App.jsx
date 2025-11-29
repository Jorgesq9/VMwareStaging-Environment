import React, { Children } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import CreateReservation from "./pages/CreateReservation";
import ReservationHistory from "./pages/ReservationHistory";
import Login from "./pages/Login";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import AdminPage from "./pages/AdminPage";
import AdminRoutes from "./privateRoutes/AdminRoutes";
import Sidebar from "./components/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div
                className={`page-content ${
                  isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
              ></div>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Otras rutas protegidas igual, pero cambiando la ruta base */}
        <Route
          path="/reservations/new"
          element={
            <PrivateRoute>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div
                className={`page-content ${
                  isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
              ></div>
              <CreateReservation />
            </PrivateRoute>
          }
        />

        <Route
          path="/reservations/history"
          element={
            <PrivateRoute>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div
                className={`page-content ${
                  isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
              ></div>
              <ReservationHistory />
            </PrivateRoute>
          }
        />

        {/* Ruta admin protegida igual */}
        <Route
          path="/admin"
          element={
            <AdminRoutes>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div
                className={`page-content ${
                  isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
              ></div>
              <AdminPage />
            </AdminRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
