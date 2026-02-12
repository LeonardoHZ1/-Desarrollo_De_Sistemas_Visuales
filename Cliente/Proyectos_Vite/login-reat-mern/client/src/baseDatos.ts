import mongoose from "mongoose";

export async function conectarDB(): Promise<void> {
    const uriMongo = process.env.MONGODB_URI || "mongodb://localhost:27017/mern-login";
    if (!uriMongo) {
        throw new Error("Error: No se ha proporcionado la URI de MongoDB en las variables de entorno.");
    }
    await mongoose.connect(uriMongo);
    console.log("Conexión a MongoDB establecida");
}