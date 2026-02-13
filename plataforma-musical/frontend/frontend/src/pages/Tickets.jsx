import { useState } from "react";

function Tickets() {
  const [ticket, setTicket] = useState({ subject: "", issue: "" });

  const sendTicket = (e) => {
    e.preventDefault();
    // Validación mínima: Descripción de al menos 15 caracteres
    if (ticket.issue.length < 15) {
      alert("⚠️ Por favor describe mejor el problema (mínimo 15 caracteres).");
      return;
    }
    alert("✅ Ticket enviado a soporte. ¡Gracias!");
    setTicket({ subject: "", issue: "" });
  };

  return (
    <div className="fade-in" style={{ maxWidth: "500px", margin: "50px auto", padding: "30px", background: "#181818", borderRadius: "15px", textAlign: "center" }}>
      {/* Icono SVG de Soporte */}
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--card-orange)" strokeWidth="2" style={{ marginBottom: "20px" }}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      
      <h2 style={{ color: "var(--card-orange)" }}>Centro de Soporte</h2>
      <p style={{ color: "#b3b3b3", fontSize: "0.9rem" }}>Cuéntanos qué problema tienes y te ayudaremos.</p>

      <form onSubmit={sendTicket} style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
        <input 
          style={{ width: "94%", padding: "12px", margin: "10px 0", borderRadius: "8px", border: "1px solid #333", background: "#222", color: "white" }}
          type="text" 
          placeholder="Asunto (ej. Error al subir canción)" 
          required
          value={ticket.subject} 
          onChange={(e) => setTicket({...ticket, subject: e.target.value})}
        />
        <textarea 
          style={{ width: "94%", padding: "12px", margin: "10px 0", borderRadius: "8px", border: "1px solid #333", background: "#222", color: "white", height: "120px", resize: "none" }}
          placeholder="Describe detalladamente el error..." 
          required
          value={ticket.issue} 
          onChange={(e) => setTicket({...ticket, issue: e.target.value})}
        />
        <button 
          type="submit" 
          className="btn-primary" 
          style={{ background: "var(--card-orange)", width: "100%", marginTop: "10px" }}
        >
          Enviar Reporte
        </button>
      </form>
    </div>
  );
}

export default Tickets;