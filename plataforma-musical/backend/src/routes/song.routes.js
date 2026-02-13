import { Router } from "express";
import { getSongs, createSong } from "../controllers/song.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, getSongs);
router.post("/", verifyToken, createSong); // Aquí usamos createSong

export default router;