
export const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado: Sesión no encontrada" });
    }

    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Acceso prohibido: se requiere rol [${allowedRoles.join(", ")}]` 
      });
    }

    
    next();
  };
};
