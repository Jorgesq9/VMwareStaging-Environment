const mongoose = require("mongoose");

const statusEnum = ["pending", "in_progress", "completed"];

const statusHistorySchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  oldReservationStatus: { type: String, enum: statusEnum, required: true },
  newReservationStatus: { type: String, enum: statusEnum, required: true },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  changedAt: { type: Date, default: Date.now },
  // notes: String, // Descomenta si quieres dejar comentarios opcionales en el futuro
});

// Index para acelerar búsquedas por reserva
statusHistorySchema.index({ reservation: 1 });

module.exports = mongoose.model("StatusHistory", statusHistorySchema);
