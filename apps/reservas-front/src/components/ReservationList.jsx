import React, { useState, useEffect } from "react";

// Badge de estado
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

const PriorityBadge = ({ priority }) => {
  const priorityMap = {
    low: "bg-gray-200 text-gray-700",
    medium: "bg-orange-200 text-orange-800",
    high: "bg-red-200 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-bold ${
        priorityMap[priority] || "bg-gray-200 text-gray-700"
      }`}
    >
      {priority === "low"
        ? "Baja"
        : priority === "medium"
        ? "Media"
        : priority === "high"
        ? "Alta"
        : priority}
    </span>
  );
};

const ReservationList = ({
  reservations = [],
  onEdit,
  applyFilters = true,
}) => {
  const [filteredReservations, setFilteredReservations] =
    useState(reservations);
  const [filters, setFilters] = useState({
    reservationStatus: "",
    priority: "",
    startDate: "",
    endDate: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (applyFilters) {
      const filtered = reservations.filter((reservation) => {
        const matchesStatus =
          !filters.reservationStatus ||
          reservation.reservationStatus === filters.reservationStatus;

        const matchesPriority =
          !filters.priority || reservation.priority === filters.priority;

        const matchesStartDate =
          !filters.startDate ||
          (reservation.startDate &&
            new Date(reservation.startDate) >= new Date(filters.startDate));

        const matchesEndDate =
          !filters.endDate ||
          (reservation.endDate &&
            new Date(reservation.endDate) <= new Date(filters.endDate));

        return (
          matchesStatus && matchesPriority && matchesStartDate && matchesEndDate
        );
      });

      setFilteredReservations(filtered);
      setMessage(
        filtered.length === 0 ? "No hay reservas con esas características." : ""
      );
    } else {
      setFilteredReservations(reservations);
      setMessage("");
    }
  }, [filters, reservations, applyFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Reservas</h2>

      {applyFilters && (
        <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl shadow">
          <div>
            <label
              className="block mb-1 text-sm font-semibold"
              htmlFor="reservationStatus"
            >
              Estado:
            </label>
            <select
              id="reservationStatus"
              name="reservationStatus"
              onChange={handleFilterChange}
              className="rounded px-2 py-1 border border-gray-300"
            >
              <option value="">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="in_progress">En Progreso</option>
              <option value="completed">Completado</option>
            </select>
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-semibold"
              htmlFor="priority"
            >
              Prioridad:
            </label>
            <select
              id="priority"
              name="priority"
              onChange={handleFilterChange}
              className="rounded px-2 py-1 border border-gray-300"
            >
              <option value="">Todas</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-semibold"
              htmlFor="startDate"
            >
              Fecha Inicio:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleFilterChange}
              className="rounded px-2 py-1 border border-gray-300"
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-semibold"
              htmlFor="endDate"
            >
              Fecha Fin:
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={handleFilterChange}
              className="rounded px-2 py-1 border border-gray-300"
            />
          </div>
        </div>
      )}

      {message && (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded mb-4">
          {message}
        </div>
      )}

      {filteredReservations.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-xl">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Servicio</th>
                <th className="px-4 py-2 text-left">Cliente</th>
                <th className="px-4 py-2 text-left">Inicio</th>
                <th className="px-4 py-2 text-left">Fin</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Prioridad</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation._id} className="border-b">
                  <td className="px-4 py-2">{reservation.serviceType}</td>
                  <td className="px-4 py-2">{reservation.client?.name}</td>
                  <td className="px-4 py-2">
                    {reservation.startDate
                      ? new Date(reservation.startDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    {reservation.endDate
                      ? new Date(reservation.endDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    <StatusBadge status={reservation.reservationStatus} />
                  </td>
                  <td className="px-4 py-2">
                    <PriorityBadge priority={reservation.priority} />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition flex items-center gap-2"
                      onClick={() => onEdit(reservation)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
