const express = require("express");
const { registerUser, loginUser } = require("../controllers/authControllers");
const { protect, restrictTo } = require("../middlewares/authMiddleware");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Rate limit solo para login (protección fuerza bruta)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    ok: false,
    message: "Demasiados intentos de login, prueba más tarde",
  },
});

router.post("/register", registerUser);
router.post("/login", loginLimiter, loginUser);

router.get("/admin", protect, restrictTo("admin"), (req, res) => {
  res.json({
    ok: true,
    message: `Acceso exitoso como administrador, bienvenido ${req.user.username}`,
  });
});

module.exports = router;
