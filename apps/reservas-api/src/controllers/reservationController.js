const mongoose = require("mongoose");
const Reservation = require("../models/reservation");
const statusHistory = require("../models/statusHistory");

// Obtener reservas (con filtros)
exports.getReservations = async (req, res) => {
  try {
    const { reservationStatus, startDate, endDate, priority } = req.query;
    const filters = {};
    if (reservationStatus) filters.reservationStatus = reservationStatus;
    if (priority) filters.priority = priority;

    if (startDate || endDate) {
      filters.startDate = {};
      if (startDate) filters.startDate.$gte = new Date(startDate);
      if (endDate) filters.startDate.$lte = new Date(endDate);
    }

    const reservations = await Reservation.find(filters).populate(
      "assignedWorker",
      "username"
    );
    res.status(200).json({ ok: true, reservations });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error obtaining reservations",
      error: error.message,
    });
  }
};

// Crear reserva
exports.createReservation = async (req, res) => {
  try {
    const {
      serviceType,
      client,
      address,
      date,
      priority,
      reservationStatus,
      startDate,
      endDate,
    } = req.body;

    if (!req.user) {
      return res
        .status(401)
        .json({ ok: false, message: "Unauthorized: User not authenticated" });
    }

    // Compatibilidad: usar "date" si no se pasan startDate o endDate
    const parsedStartDate = startDate || date;
    const parsedEndDate = endDate || date;

    if (!serviceType || !client?.name || !client?.phone || !parsedStartDate) {
      return res
        .status(400)
        .json({ ok: false, message: "Missing required fields" });
    }

    const reservation = new Reservation({
      serviceType,
      client,
      address,
      assignedWorker: req.user._id,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      priority,
      reservationStatus,
    });

    await reservation.save();
    res.status(201).json({ ok: true, reservation });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error creating reservation",
      error: error.message,
    });
  }
};

// Actualizar reserva
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid reservation ID" });
    }
    const updates = req.body;

    const reservation = await Reservation.findById(id);
    if (!reservation)
      return res
        .status(404)
        .json({ ok: false, message: "Reservation not found" });

    // Solo admin o dueño de la reserva pueden actualizar
    if (
      req.user.role !== "admin" &&
      (!reservation.assignedWorker ||
        !reservation.assignedWorker.equals(req.user._id))
    ) {
      return res.status(403).json({ ok: false, message: "Not allowed" });
    }

    // Registrar cambio de estado
    if (
      updates.reservationStatus &&
      updates.reservationStatus !== reservation.reservationStatus
    ) {
      await statusHistory.create({
        reservation: id,
        oldReservationStatus: reservation.reservationStatus,
        newReservationStatus: updates.reservationStatus,
        changedBy: req.user.id,
      });
    }

    // Evitar actualización de campos críticos por usuarios no admin
    if (req.user.role !== "admin") {
      delete updates.assignedWorker;
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    res.status(200).json({ ok: true, reservation: updatedReservation });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error updating the reservation",
      error: error.message,
    });
  }
};

// Eliminar reserva (solo admin)
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid reservation ID" });
    }

    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res
        .status(404)
        .json({ ok: false, message: "Reservation not found" });
    }

    res
      .status(200)
      .json({ ok: true, message: "Reservation eliminated successfully" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error eliminating the reservation",
      error: error.message,
    });
  }
};

// Consultar historial de cambios de estado
exports.getStatusHistory = async (req, res) => {
  try {
    const { reservationId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(reservationId)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid reservation ID" });
    }

    const history = await statusHistory
      .find({ reservation: reservationId })
      .populate("changedBy", "username")
      .exec();

    res.status(200).json({ ok: true, history });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error obtaining history",
      error: error.message,
    });
  }
};

// Estadísticas
exports.getStatistics = async (req, res) => {
  try {
    const totalReservations = await Reservation.countDocuments();
    const completedReservations = await Reservation.countDocuments({
      reservationStatus: "completed",
    });
    const pendingReservations = await Reservation.countDocuments({
      reservationStatus: "pending",
    });
    const inProgressReservations = await Reservation.countDocuments({
      reservationStatus: "in_progress",
    });

    res.status(200).json({
      ok: true,
      totalReservations,
      completedReservations,
      pendingReservations,
      inProgressReservations,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error obtaining the stats",
      error: error.message,
    });
  }
};
