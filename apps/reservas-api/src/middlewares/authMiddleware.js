const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ ok: false, message: "User not found" });
    }
    req.user = user; // Asignar el usuario a req.user
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ ok: false, message: "Token expired" });
    }
    return res.status(401).json({ ok: false, message: "Invalid token" });
  }
};

// Middleware para restringir acceso por roles flexiblemente
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ ok: false, message: "Access denied" });
    }
    next();
  };
