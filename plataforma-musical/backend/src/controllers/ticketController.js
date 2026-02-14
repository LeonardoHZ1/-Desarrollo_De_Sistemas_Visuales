import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ticket = await Ticket.create({
      title,
      description,
      priority: "high", 
      user: req.user.id // ID extraído del Token JWT
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error al guardar el reporte" });
  }
};

export const getTickets = async (req, res) => {
  try {
   
    const tickets = await Ticket.find().populate("user", "username email").sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la lista de tickets" });
  }
};