import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_AUTH || "http://localhost:5000/api/auth";

// --- Storage helpers ---
const USER_KEY = "user";

const setUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return user || null;
  } catch {
    return null;
  }
};

const clearUser = () => localStorage.removeItem(USER_KEY);

// --- Auth services ---
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    const { token, user } = response.data;

    setUser({ ...user, token });

    return { ...user, token };
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    throw new Error(message);
  }
};

export const logoutUser = () => {
  clearUser();
};

// Esta función es la que esperan los imports de tu app:
export { getCurrentUser };
