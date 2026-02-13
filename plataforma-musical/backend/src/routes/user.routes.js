import { Router } from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = Router();

router.get("/", verifyToken, verifyRole("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;
