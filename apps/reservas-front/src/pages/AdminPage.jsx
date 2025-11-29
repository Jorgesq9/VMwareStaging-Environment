import React, { useState, useEffect } from "react";
import {
  deleteReservation,
  getReservations,
} from "../services/reservationService";
import AdminReservationList from "../components/AdminReservationList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const data = await getReservations();
      const reservationsArray = Array.isArray(data.reservations)
        ? data.reservations
        : Array.isArray(data)
        ? data
        : [];

      setReservations(reservationsArray);
    } catch (error) {
      console.error("Error al obtener las reservas:", error.message);
      toast.error("No se pudieron cargar las reservas.");
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
      try {
        await deleteReservation(id);
        toast.success("Reserva eliminada con éxito");
        fetchReservations(); // Actualiza tras eliminar
      } catch (error) {
        console.error("Error eliminando la reserva:", error.message);
        toast.error("No se pudo eliminar la reserva");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="text-xl font-bold text-blue-600 animate-pulse">
          Cargando reservas...
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 md:px-8">
      <AdminReservationList
        reservations={Array.isArray(reservations) ? reservations : []}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminPage;
