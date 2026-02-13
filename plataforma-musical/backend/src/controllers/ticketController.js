import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // Log para depuración (verás esto en la terminal del VS Code)
    console.log("Usuario creando ticket:", req.user);

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      user: req.user._id // Usamos el ID de tu usuario "Admin Principal"
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error("Error Mongo:", error);
    res.status(500).json({ message: "Error al guardar en base de datos" });
  }
};

// Obtener todos los tickets (útil para el admin o para ver los propios)
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("user", "name email");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tickets" });
  }
};