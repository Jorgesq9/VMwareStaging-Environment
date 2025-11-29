const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const app = express();

// Seguridad
app.use(helmet({ contentSecurityPolicy: false }));
// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(morgan("dev"));
app.use(express.json());

// Swagger (proteger en prod si quieres)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.get("/", (req, res) => res.send("API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);

// Middleware de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    ok: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
