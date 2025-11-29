import React, { useState } from "react";
import { createReservation } from "../services/reservationService";
import { toast } from "react-toastify";

const CreateReservation = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    serviceType: "",
    startDate: "",
    endDate: "",
    reservationStatus: "pending",
    priority: "low",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reservationData = {
      serviceType: formData.serviceType,
      reservationStatus: formData.reservationStatus,
      priority: formData.priority,
      startDate: formData.startDate || formData.date,
      endDate: formData.endDate || formData.date,
      client: {
        name: formData.clientName,
        phone: formData.clientPhone,
      },
    };

    try {
      await createReservation(reservationData);
      toast.success("Reserva creada exitosamente ✅");
      setFormData({
        clientName: "",
        clientPhone: "",
        serviceType: "",
        date: "",
        startDate: "",
        endDate: "",
        reservationStatus: "pending",
        priority: "low",
      });
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      toast.error("Hubo un error al crear la reserva ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          Crear Nueva Reserva
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="clientName"
              className="block font-medium text-gray-700 mb-1"
            >
              Nombre del Cliente <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="clientPhone"
              className="block font-medium text-gray-700 mb-1"
            >
              Teléfono del Cliente <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="clientPhone"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="serviceType"
              className="block font-medium text-gray-700 mb-1"
            >
              Tipo de Servicio <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
            {loading ? "Creando..." : "Crear Reserva"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReservation;
