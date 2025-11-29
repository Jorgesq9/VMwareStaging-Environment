import React, { useState, useEffect } from "react";
import {
  getReservations,
  getStatusHistory,
} from "../services/reservationService";
import { FiClock, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const StatusBadge = ({ status }) => {
  const statusMap = {
    pending: "bg-yellow-200 text-yellow-800",
    in_progress: "bg-blue-200 text-blue-800",
    completed: "bg-green-200 text-green-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-bold ${
        statusMap[status] || "bg-gray-200 text-gray-700"
      }`}
    >
      {status === "pending"
        ? "Pendiente"
        : status === "in_progress"
        ? "En Progreso"
        : status === "completed"
        ? "Completada"
        : status}
    </span>
  );
};

const ReservationHistory = () => {
  const location = useLocation();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "startDate", // ✅ corregido
    direction: "asc",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        const reservationsArray = Array.isArray(data.reservations)
          ? data.reservations
          : Array.isArray(data)
          ? data
          : [];

        setReservations(reservationsArray);
        setFilteredReservations(reservationsArray);
        setSelectedReservation(null);
        setStatusHistory([]);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setReservations([]);
        setFilteredReservations([]);
      }
    };

    fetchReservations();
  }, [location]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredReservations(
      reservations.filter(
        (res) =>
          res.assignedWorker?.username?.toLowerCase().includes(term) ||
          res.serviceType?.toLowerCase().includes(term)
      )
    );
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...filteredReservations].sort((a, b) => {
      const getValue = (obj, path) =>
        path.split(".").reduce((acc, part) => acc && acc[part], obj);
      const aVal = getValue(a, key);
      const bVal = getValue(b, key);
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredReservations(sortedData);
  };

  const fetchStatusHistory = async (reservationId) => {
    try {
      setLoading(true);
      const response = await getStatusHistory(reservationId);
      const historyArray = Array.isArray(response?.history)
        ? response.history
        : [];

      setStatusHistory(historyArray);
      setSelectedReservation(reservationId);
    } catch (error) {
      console.error("Error fetching status history:", error);
      setStatusHistory([]);
      setSelectedReservation(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 px-4 md:px-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Historial de Reservas
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por trabajador o tipo de servicio..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("startDate")} // ✅ corregido
              >
                Fecha{" "}
                {sortConfig.key === "startDate" &&
                  (sortConfig.direction === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  ))}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("assignedWorker.username")}
              >
                Trabajador{" "}
                {sortConfig.key === "assignedWorker.username" &&
                  (sortConfig.direction === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  ))}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("reservationStatus")}
              >
                Estado{" "}
                {sortConfig.key === "reservationStatus" &&
                  (sortConfig.direction === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  ))}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("serviceType")}
              >
                Servicio{" "}
                {sortConfig.key === "serviceType" &&
                  (sortConfig.direction === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  ))}
              </th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-yellow-700 py-4">
                  No hay reservas que coincidan.
                </td>
              </tr>
            ) : (
              filteredReservations.map((reservation) => (
                <tr key={reservation._id} className="border-b">
                  <td className="px-4 py-2">
                    {new Date(reservation.startDate).toLocaleDateString()} -{" "}
                    {new Date(reservation.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {reservation.assignedWorker?.username || "Sin asignar"}
                  </td>
                  <td className="px-4 py-2">
                    <StatusBadge status={reservation.reservationStatus} />
                  </td>
                  <td className="px-4 py-2">{reservation.serviceType}</td>
                  <td className="px-4 py-2">
                    <button
                      className={`bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition flex items-center gap-1 ${
                        loading && selectedReservation === reservation._id
                          ? "opacity-60 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => fetchStatusHistory(reservation._id)}
                      disabled={
                        loading && selectedReservation === reservation._id
                      }
                    >
                      <FiClock />
                      {loading && selectedReservation === reservation._id
                        ? "Cargando..."
                        : "Ver Historial"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedReservation || loading ? (
        <div className="bg-white shadow-lg rounded-xl p-6 mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-700">
            Historial de Estados
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Antiguo Estado</th>
                  <th className="px-4 py-2">Nuevo Estado</th>
                  <th className="px-4 py-2">Cambiado Por</th>
                  <th className="px-4 py-2">Fecha de Cambio</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(statusHistory) && statusHistory.length > 0 ? (
                  statusHistory.map((history) => (
                    <tr key={history._id} className="border-b">
                      <td className="px-4 py-2">
                        {history.oldReservationStatus || "Desconocido"}
                      </td>
                      <td className="px-4 py-2">
                        {history.newReservationStatus || "Desconocido"}
                      </td>
                      <td className="px-4 py-2">
                        {history.changedBy?.username || "Desconocido"}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(history.changedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center text-yellow-700 py-4"
                    >
                      {loading
                        ? "Cargando historial..."
                        : "No hay cambios de estado registrados para esta reserva."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationHistory;
