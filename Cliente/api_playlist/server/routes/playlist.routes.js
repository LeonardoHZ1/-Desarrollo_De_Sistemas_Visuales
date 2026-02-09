const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist");

// 👉 GET /api/playlist
router.get("/", async (req, res) => {
  try {
    const canciones = await Playlist.find();
    res.json(canciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la playlist" });
  }
});

// 👉 POST /api/playlist
router.post("/", async (req, res) => {
  try {
    const { titulo, artista } = req.body;

    if (!titulo || !artista) {
      return res.status(400).json({
        error: "Titulo y artista son obligatorios",
      });
    }

    const nuevaCancion = new Playlist({ titulo, artista });
    await nuevaCancion.save();

    res.status(201).json(nuevaCancion);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la canción" });
  }
});

module.exports = router;
