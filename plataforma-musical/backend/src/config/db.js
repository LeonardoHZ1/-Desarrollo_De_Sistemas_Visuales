import mongoose from "mongoose";

// Usamos export const para que coincida con la importación entre llaves { connectDB }
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error en conexión: ${error.message}`);
    process.exit(1); // Detiene la app si no hay base de datos
  }
};