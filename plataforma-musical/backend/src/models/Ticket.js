import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Debe ser ObjectId
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);