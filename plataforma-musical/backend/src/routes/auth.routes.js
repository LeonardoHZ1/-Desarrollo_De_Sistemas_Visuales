import { Router } from "express";
import { login, register, logout, verifyTokenResponse } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// ESTA ES LA RUTA QUE TE FALTA (La que busca el Frontend)
router.get("/verify", verifyToken, verifyTokenResponse);

export default router;