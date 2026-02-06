const express = require('express');
const Nota = require('../modelos/nota');

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { texto } = req.body;

        if (!texto || texto.trim().length < 5) {
            return res.status(400).json({
                mensaje: "El texto debe tener al menos 5 caracteres."
            });
        }

        const notaCreada = await Nota.create({
            texto: texto.trim()
        });

        return res.status(201).json(notaCreada);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

router.get("/", async (req, res) => {
    try {
        const notas = await Nota.find().sort({ createdAt: -1 });
        return res.status(200).json(notas);
    } catch (error) {
        return res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

module.exports = router;
