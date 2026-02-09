require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const playlistRoutes = require("../routes/playlist.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.use("/api/playlist", playlistRoutes);

// Ruta de prueba
app.get("/test", (req, res) => {
  res.json({ mensaje: "API Playlist funcionando 🎶" });
});

// Conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error MongoDB:", err));

// Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
