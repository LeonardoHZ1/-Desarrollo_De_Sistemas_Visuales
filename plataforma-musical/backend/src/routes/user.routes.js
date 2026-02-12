import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = Router();

router.get("/", verifyToken, verifyRole("admin"), getUsers);

export default router;
