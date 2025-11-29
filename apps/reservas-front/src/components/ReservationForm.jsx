import React, { useState } from "react";

const ReservationForm = ({ reservation, onUpdate }) => {
  const [formData, setFormData] = useState({
    serviceType: reservation.serviceType,
    clientName: reservation.client?.name || "",
    reservationStatus: reservation.reservationStatus,
    priority: reservation.priority,
    startDate: reservation.startDate?.slice(0, 10) || "",
    endDate: reservation.endDate?.slice(0, 10) || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
      setLoading(false);
      return;
    }

    const updatedReservation = {
      ...reservation,
      ...formData,
      client: { ...reservation.client, name: formData.clientName },
    };

    await onUpdate(updatedReservation);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Editar Reserva
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="clientName"
              className="block font-medium text-gray-700 mb-1"
            >
              Nombre del Cliente
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Nombre del Cliente"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="serviceType"
              className="block font-medium text-gray-700 mb-1"
            >
              Tipo de Servicio
            </label>
            <input
              type="text"
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              placeholder="Tipo de Servicio"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block font-medium text-gray-700 mb-1"
            >
              Fecha de Inicio
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block font-medium text-gray-700 mb-1"
            >
              Fecha de Fin
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="reservationStatus"
              className="block font-medium text-gray-700 mb-1"
            >
              Estado
            </label>
            <select
              id="reservationStatus"
              name="reservationStatus"
              value={formData.reservationStatus}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pendiente</option>
              <option value="in_progress">En progreso</option>
              <option value="completed">Completada</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block font-medium text-gray-700 mb-1"
            >
              Prioridad
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
