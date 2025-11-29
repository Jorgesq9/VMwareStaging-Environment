import axios from "axios";
import { getCurrentUser } from "./authservice"; // Usamos la función correcta

const API_URL =
  import.meta.env.VITE_API_RESERVATIONS ||
  "http://localhost:5000/api/reservations";

const getToken = () => {
  const user = getCurrentUser();
  if (!user || !user.token)
    throw new Error("Token no encontrado. Inicia sesión nuevamente.");
  return user.token;
};

// Helper para headers
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// Obtener todas las reservas con filtros opcionales
export const getReservations = async (filters = {}) => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeaders(),
      params: filters,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error al obtener reservas.";
    throw new Error(message);
  }
};

// Crear una nueva reserva
export const createReservation = async (reservationData) => {
  try {
    if (!reservationData.startDate || !reservationData.serviceType) {
      throw new Error("Datos incompletos para la reserva.");
    }

    const response = await axios.post(API_URL, reservationData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error al crear la reserva.";
    throw new Error(message);
  }
};

// Actualizar una reserva existente
export const updateReservation = async (id, updates) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updates, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error al actualizar la reserva.";
    throw new Error(message);
  }
};

// Eliminar una reserva existente
export const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error al eliminar la reserva.";
    throw new Error(message);
  }
};

// Obtener historial de cambios
export const getStatusHistory = async (reservationId) => {
  try {
    const response = await axios.get(`${API_URL}/${reservationId}/history`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Error al obtener el historial de estado.";
    throw new Error(message);
  }
};
