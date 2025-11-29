import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../services/authservice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiLock, FiUser } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Mostrar notificación si viene un error por el estado de la navegación
  useEffect(() => {
    if (location.state && location.state.error) {
      toast.error(location.state.error);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await loginUser(credentials);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("¡Bienvenido!");
      navigate("/Dashboard");
    } catch (error) {
      toast.error("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 font-medium text-gray-700"
            >
              <span className="flex items-center gap-2">
                <FiUser /> Nombre de Usuario
              </span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Usuario"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-700"
            >
              <span className="flex items-center gap-2">
                <FiLock /> Contraseña
              </span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>
        <div className="mt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Central de Reservas
        </div>
      </div>
    </div>
  );
};

export default Login;
