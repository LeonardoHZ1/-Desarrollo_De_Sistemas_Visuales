import { Router } from "express";
import { getSongs, createSong, deleteSong } from "../controllers/song.controller.js";

const router = Router();

router.get("/", getSongs);
router.post("/", createSong);
router.delete("/:id", deleteSong); // Ruta para el botón de la papelera

export default router;