import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyRole } from "../middleware/verifyRole.js"; 


const router = Router();


router.get("/", verifyToken, verifyRole("admin"), (req, res) => {
    res.json({ message: "Ruta de administración de usuarios activa" });
});

export default router;