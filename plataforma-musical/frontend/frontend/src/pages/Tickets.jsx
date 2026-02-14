import { useState, useEffect } from "react";
import axios from "axios";

function Tickets() {
  const [ticket, setTicket] = useState(() => {
    const saved = localStorage.getItem("ticketDraft");
    return saved ? JSON.parse(saved) : { title: "", description: "" };
  });

  useEffect(() => {
    localStorage.setItem("ticketDraft", JSON.stringify(ticket));
  }, [ticket]);

  const sendTicket = async (e) => {
    e.preventDefault();
    if (ticket.description.length < 15) {
      alert("⚠️ Describe mejor el problema (mínimo 15 caracteres).");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/tickets", ticket, {
        withCredentials: true 
      });
      alert("✅ Ticket enviado con éxito.");
      localStorage.removeItem("ticketDraft");
      setTicket({ title: "", description: "" });
    } catch (error) {
      alert("❌ Error al enviar el ticket.");
    }
  };

  return (
    <div className="fade-in glass-form" style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      {/* SVG con tamaño controlado para que no salga gigante */}
      <svg 
        className="icon-float" 
        width="80" 
        height="80" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="var(--card-orange)" 
        strokeWidth="2" 
        style={{ marginBottom: "20px" }}
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>

      <h2 style={{ color: "var(--card-orange)" }}>Centro de Soporte</h2>
      <form onSubmit={sendTicket}>
        <input 
          className="input-field" 
          type="text" 
          placeholder="Asunto" 
          required 
          value={ticket.title} 
          onChange={(e) => setTicket({...ticket, title: e.target.value})} 
        />
        <textarea 
          className="input-field" 
          style={{ height: "120px" }} 
          placeholder="Descripción detallada..." 
          required 
          value={ticket.description} 
          onChange={(e) => setTicket({...ticket, description: e.target.value})} 
        />
        <p className="pulse-draft" style={{ marginBottom: "15px" }}>● Borrador guardado localmente</p>
        <button type="submit" className="btn-primary" style={{ background: "var(--card-orange)", width: "100%" }}>
          Enviar Reporte
        </button>
      </form>
    </div>
  );
}

export default Tickets;