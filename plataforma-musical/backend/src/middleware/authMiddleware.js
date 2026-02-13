import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Busca la cookie llamada 'token' (o como la hayas nombrado en el login)
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No hay token, autorización denegada" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token no válido" });

    req.user = user; // Guardamos los datos decodificados (id, role, etc)
    next();
  });
};