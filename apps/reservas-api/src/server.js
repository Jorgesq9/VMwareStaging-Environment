const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥", err);
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥", err);
  process.exit(1);
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar MongoDB", error);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
  await connectDB();
  server = app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  );
};

startServer();

process.on("SIGINT", () => {
  console.log("Apagando servidor...");
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log("Conexión a Mongo cerrada");
      process.exit(0);
    });
  });
});
