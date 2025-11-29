import React, { useState, useEffect } from "react";

// Badge de estado visual
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

const AdminReservationList = ({ reservations = [], onDelete }) => {
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
    const filtered = reservations.filter((reservation) => {
      const matchesStatus =
        !filters.reservationStatus ||
        reservation.reservationStatus === filters.reservationStatus;
      const matchesPriority =
        !filters.priority || reservation.priority === filters.priority;
      const matchesStartDate =
        !filters.startDate ||
        new Date(reservation.date) >= new Date(filters.startDate);
      const matchesEndDate =
        !filters.endDate ||
        new Date(reservation.date) <= new Date(filters.endDate);
      return (
        matchesStatus && matchesPriority && matchesStartDate && matchesEndDate
      );
    });

    setFilteredReservations(filtered);

    if (filtered.length === 0) {
      setMessage("No hay reservas con esas características.");
    } else {
      setMessage("");
    }
  }, [filters, reservations]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Confirmar antes de eliminar
  const handleDelete = (id) => {
    onDelete(id); // Sin confirmación aquí
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Panel Administrador</h1>
      <h2 className="text-lg mb-6 text-gray-600">
        Lista de Reservas (permiso para eliminar)
      </h2>

      {/* Filtros */}
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
          <label className="block mb-1 text-sm font-semibold" htmlFor="endDate">
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

      {/* Mensaje si no hay reservas */}
      {message && (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded mb-4">
          {message}
        </div>
      )}

      {/* Tabla de Reservas */}
      {filteredReservations.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-xl">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Servicio</th>
                <th className="px-4 py-2 text-left">Cliente</th>
                <th className="px-4 py-2 text-left">Fecha</th>
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
                    {new Date(reservation.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <StatusBadge status={reservation.reservationStatus} />
                  </td>
                  <td className="px-4 py-2">
                    <PriorityBadge priority={reservation.priority} />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      onClick={() => handleDelete(reservation._id)}
                    >
                      Eliminar
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

export default AdminReservationList;
