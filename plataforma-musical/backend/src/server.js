import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import authRoutes from './routes/auth.routes.js'; 
import songRoutes from './routes/song.routes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cookieParser()); 
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,                
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);

// Conexión a MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://mongodb_container:27017/musicaDB';
mongoose.connect(mongoURI)
    .then(() => console.log("✅ CONECTADO A musicaDB"))
    .catch(err => console.error("❌ ERROR DE CONEXIÓN:", err.message));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 SERVIDOR EN PUERTO ${PORT}`));