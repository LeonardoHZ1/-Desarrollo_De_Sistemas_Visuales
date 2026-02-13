import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyRole } from "../middleware/verifyRole.js"; // Nombre corregido
// Importa aquí tus controladores de usuario si los tienes, ej:
// import { getUsers, updateUser } from "../controllers/user.controller.js";

const router = Router();

// Ejemplo: Solo el admin puede ver la lista de usuarios
router.get("/", verifyToken, verifyRole("admin"), (req, res) => {
    res.json({ message: "Ruta de administración de usuarios activa" });
});

export default router;