import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, username, role } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json({ message: ["El email ya está en uso"] });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role: role || "user"
    });

    const userSaved = await newUser.save();
    const token = jwt.sign({ id: userSaved._id, role: userSaved.role }, process.env.JWT_SECRET || 'secret123');
    
    res.cookie("token", token, {
        httpOnly: false, 
        secure: false,   
        sameSite: 'lax'
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: ["Usuario no encontrado"] });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: ["Contraseña incorrecta"] });

    const token = jwt.sign({ id: userFound._id, role: userFound.role }, process.env.JWT_SECRET || 'secret123');
    
    res.cookie("token", token, {
        httpOnly: false, 
        secure: false,   
        sameSite: 'lax'
    });

    res.json({ id: userFound._id, username: userFound.username, role: userFound.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const verifyTokenResponse = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });
    return res.json({ id: userFound._id, username: userFound.username, email: userFound.email, role: userFound.role });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};