const mongoose = require('mongoose');

async function conectarBaseDeDatos(uriMongo) {
    try {
        await mongoose.connect(uriMongo);
        console.log("Conexión a la base de datos exitosa");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1);
    }
}

module.exports = conectarBaseDeDatos;
