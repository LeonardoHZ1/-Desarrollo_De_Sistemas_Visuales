import { Router } from "express";
import Song from "../models/Song.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", verifyToken, async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

router.post("/", verifyToken, async (req, res) => {
  const song = await Song.create(req.body);
  res.status(201).json(song);
});

export default router;
