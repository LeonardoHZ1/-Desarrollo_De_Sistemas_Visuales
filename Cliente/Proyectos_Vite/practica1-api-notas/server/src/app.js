const express = require('express');
const cors = require('cors');
require('dotenv').config();

const rutasNotas = require('./rutas/notas.rutas');
const conectarBaseDeDatos = require('./bd');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/notas', rutasNotas);
app.use('/api/salud', (req, res) => res.json({ ok: true }));

const PUERTO = process.env.PUERTO || 3000;

// Logs de verificación (temporal)
console.log("PUERTO:", PUERTO);
console.log("URI_MONGO:", process.env.URI_MONGO);

conectarBaseDeDatos(process.env.URI_MONGO)
    .then(() => {
        app.listen(PUERTO, () => {
            console.log(`Servidor escuchando en el puerto ${PUERTO}`);
        });
    });
