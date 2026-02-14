import { Router } from "express";
import { createTicket, getTickets } from "../controllers/ticketController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = Router();

// Todos pueden reportar
router.post("/", verifyToken, verifyRole("user", "admin", "artista", "moderador"), createTicket);

// Solo Staff puede ver la lista completa
router.get("/", verifyToken, verifyRole("admin", "moderador"), getTickets);

export default router;