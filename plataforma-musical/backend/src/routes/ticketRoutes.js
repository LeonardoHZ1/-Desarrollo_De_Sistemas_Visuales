import express from "express";
import { createTicket, getTickets } from "../controllers/ticketController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyRole } from "../middleware/verifyRole.js"; // Nombre corregido

const router = express.Router();

// Cualquier usuario con rol 'user' o 'admin' puede crear tickets
router.post("/", verifyToken, verifyRole("user", "admin"), createTicket);

// Solo el admin puede ver la lista de todos los tickets
router.get("/", verifyToken, verifyRole("admin"), getTickets);

export default router;