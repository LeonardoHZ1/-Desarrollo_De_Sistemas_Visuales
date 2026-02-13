import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description)
      return res.status(400).json({ message: "Campos obligatorios" });

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      user: req.user.id
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error creando ticket" });
  }
};

export const getTickets = async (req, res) => {
  const tickets = await Ticket.find().populate("user", "name email");
  res.json(tickets);
};
