import { Router } from "express";
import {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
  exportSongsPDF
} from "../controllers/song.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = Router();

router.get("/", verifyToken, getSongs);
router.post("/", verifyToken, verifyRole("admin", "artist"), createSong);
router.put("/:id", verifyToken, verifyRole("admin"), updateSong);
router.delete("/:id", verifyToken, verifyRole("admin"), deleteSong);
router.get("/export/pdf", verifyToken, verifyRole("admin"), exportSongsPDF);

export default router;
