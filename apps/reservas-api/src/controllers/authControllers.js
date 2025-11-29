const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validación simple
    if (!username || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "Username and password are required" });
    }

    // Comprueba si el usuario ya existe
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res
        .status(409)
        .json({ ok: false, message: "Username already exists" });
    }

    // Crear y guardar usuario
    const user = new User({ username, password, role });
    await user.save();

    res.status(201).json({ ok: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error); // Solo loguea en el servidor
    res.status(500).json({ ok: false, message: "User registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validación simple
    if (!username || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ ok: false, message: "User not found" });

    // Usa el método del modelo
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ ok: false, message: "Password not valid" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      ok: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error); // Solo loguea en el servidor
    res.status(500).json({ ok: false, message: "Login failed" });
  }
};
