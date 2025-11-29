const express = require("express");
const {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation, // Mejor en singular
  getStatusHistory,
  getStatistics,
} = require("../controllers/reservationController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

// Rutas principales
router
  .route("/")
  .get(protect, getReservations)
  .post(protect, createReservation);

router
  .route("/:id")
  .patch(protect, updateReservation)
  .delete(protect, restrictTo("admin"), deleteReservation);

// Ruta para historial de cambios
router.route("/:reservationId/history").get(protect, getStatusHistory);

// Ruta para estadísticas
router.route("/statistics").get(protect, restrictTo("admin"), getStatistics);

module.exports = router;
