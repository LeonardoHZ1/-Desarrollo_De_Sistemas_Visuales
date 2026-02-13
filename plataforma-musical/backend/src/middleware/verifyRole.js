// backend/src/middleware/verifyRole.js

export const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Verificar si el middleware anterior (verifyToken) inyectó al usuario
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado: Sesión no encontrada" });
    }

    // 2. Comprobar si el rol del usuario está en la lista de permitidos
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Acceso prohibido: se requiere rol [${allowedRoles.join(", ")}]` 
      });
    }

    // 3. Si todo está bien, continuar
    next();
  };
};
