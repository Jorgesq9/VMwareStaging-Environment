const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    serviceType: { type: String, required: true },
    client: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },
    address: String,
    assignedWorker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reservationStatus: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    // Historial de estados
    statusHistory: [
      {
        status: { type: String },
        changedAt: { type: Date, default: Date.now },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    // Campos para multi-negocio y notas
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
