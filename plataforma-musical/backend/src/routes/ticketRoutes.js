import express from "express";
import { createTicket, getTickets } from "../controllers/ticketController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createTicket);
router.get("/", verifyToken, getTickets);

export default router;
