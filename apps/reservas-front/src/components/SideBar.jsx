import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiPlusCircle,
  FiClock,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { getCurrentUser } from "../services/authservice";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const sidebarRef = useRef(null);

  const toggleAdminMenu = () => setIsAdminMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { icon: <FiHome />, label: "Dashboard", path: "/Dashboard" },
    {
      icon: <FiPlusCircle />,
      label: "Crear Reserva",
      path: "/reservations/new",
    },
    {
      icon: <FiClock />,
      label: "Historial de Reservas",
      path: "/reservations/history",
    },
  ];

  const adminMenu = [
    { icon: <FiUser />, label: "Eliminar Reservas", path: "/admin" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleSidebar]);

  useEffect(() => {
    if (isOpen) toggleSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (location.pathname === "/login") return null;

  return (
    <>
      {/* Botón hamburguesa visible solo cuando sidebar está cerrado */}
      {!isOpen && (
        <button
          className="fixed top-6 left-4 md:top-4 md:left-4 z-40 text-2xl text-gray-600 bg-white rounded-full shadow p-3"
          onClick={toggleSidebar}
          aria-label="Abrir menú"
        >
          <FiMenu />
        </button>
      )}

      {/* Sidebar desplegado */}
      {isOpen && (
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 h-full bg-white shadow-lg z-50 w-64 transform transition-transform duration-200 ease-in-out translate-x-0"
        >
          <div className="flex flex-col h-full p-6">
            <h2 className="text-2xl font-bold mb-8 text-blue-700 tracking-tight">
              Central de Reservas
            </h2>

            <ul className="flex-1 space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition text-base font-medium
                    ${
                      location.pathname === item.path
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}

              {user?.role === "admin" && (
                <li>
                  <button
                    onClick={toggleAdminMenu}
                    className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-base font-medium hover:bg-gray-100 text-gray-700"
                    aria-expanded={isAdminMenuOpen}
                    aria-controls="admin-submenu"
                  >
                    <FiUser />
                    Administradores {isAdminMenuOpen ? "▲" : "▼"}
                  </button>

                  {isAdminMenuOpen && (
                    <ul id="admin-submenu" className="ml-6 mt-2 space-y-1">
                      {adminMenu.map((item) => (
                        <li key={item.path}>
                          <button
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition text-base font-medium
                            ${
                              location.pathname === item.path
                                ? "bg-blue-100 text-blue-700"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            {item.icon}
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )}
            </ul>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 mt-6 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition text-base font-medium"
            >
              <FiLogOut />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
