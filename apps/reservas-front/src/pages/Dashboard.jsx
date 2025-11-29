import React, { useEffect, useState } from "react";
import {
  getReservations,
  updateReservation,
} from "../services/reservationService";
import ReservationList from "../components/ReservationList";
import ReservationForm from "../components/ReservationForm";
// import "tailwindcss/tailwind.css"; // Solo si lo tienes en main

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        // 👇 Aquí está la diferencia: siempre extrae el array
        const reservas = Array.isArray(data) ? data : data.reservations;
        console.log("📦 Ejemplo de reserva recibida:", reservas[0]);
        setReservations(reservas || []);
        setFilteredReservations(reservas || []);
      } catch (error) {
        console.error("Error loading the reservations");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredReservations(
      reservations.filter((res) =>
        res.client?.name?.toLowerCase().includes(term)
      )
    );
  };

  const handleUpdate = async (updatedReservation) => {
    try {
      const response = await updateReservation(
        updatedReservation._id,
        updatedReservation
      );

      const updatedData = response.reservation || response; // 👈 aseguramos el objeto correcto

      setReservations((prev) =>
        prev.map((res) => (res._id === updatedData._id ? updatedData : res))
      );

      setFilteredReservations((prev) =>
        prev.map((res) => (res._id === updatedData._id ? updatedData : res))
      );

      setSelectedReservation(null);
    } catch (error) {
      console.error("Error updating the reservation:", error.message);
    }
  };

  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-xl font-bold text-blue-600 animate-pulse">
          Cargando reservas...
        </div>
      </div>
    );

  return (
    <div className="pt-20 px-4 md:px-8">
      {/* Stats/dashboard arriba */}
      <div className="mb-6 flex flex-wrap gap-4">
        {/* Aquí puedes añadir cards de stats: total reservas, pendientes, completadas... */}
        {/* Ejemplo: */}
        <div className="flex-1 bg-white shadow rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-700">
            {reservations.length}
          </div>
          <div className="text-gray-600">Reservas Totales</div>
        </div>
        <div className="flex-1 bg-white shadow rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-yellow-500">
            {
              reservations.filter((r) => r.reservationStatus === "pending")
                .length
            }
          </div>
          <div className="text-gray-600">Pendientes</div>
        </div>
        <div className="flex-1 bg-white shadow rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-green-600">
            {
              reservations.filter((r) => r.reservationStatus === "completed")
                .length
            }
          </div>
          <div className="text-gray-600">Completadas</div>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre de cliente..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Lista de Reservas */}
        <div
          className={`flex-1 transition-all ${
            selectedReservation ? "md:w-2/3" : "w-full"
          }`}
        >
          <ReservationList
            reservations={filteredReservations}
            onEdit={handleEdit}
            applyFilters={true}
          />
        </div>
        {/* Formulario de Reservas */}
        {selectedReservation && (
          <div className="flex-1 max-w-lg">
            <ReservationForm
              reservation={selectedReservation}
              onUpdate={handleUpdate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
