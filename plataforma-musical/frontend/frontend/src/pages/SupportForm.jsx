import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SupportForm() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  
  const [ticket, setTicket] = useState(() => {
    const saved = localStorage.getItem("support_draft");
    return saved ? JSON.parse(saved) : { subject: "", message: "", category: "tecnico" };
  });

  
  useEffect(() => {
    setAnimate(true);
    localStorage.setItem("support_draft", JSON.stringify(ticket));
  }, [ticket]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("support_draft");
    alert("¡Ticket enviado con éxito!");
    navigate("/dashboard");
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'radial-gradient(circle at top left, #1a1a2e, #0a0a0a)',
      fontFamily: 'sans-serif',
      opacity: animate ? 1 : 0,
      transform: animate ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
    },
    card: {
      width: '100%',
      maxWidth: '450px',
      background: '#121214',
      borderRadius: '30px',
      border: '1px solid #333',
      boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
      overflow: 'hidden',
      color: 'white'
    },
    banner: {
      height: '120px',
      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: { padding: '40px 35px' },
    label: {
      fontSize: '11px',
      color: '#a855f7',
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '8px',
      letterSpacing: '1px'
    },
    input: {
      width: '100%',
      padding: '14px',
      marginBottom: '20px',
      background: '#1a1a1c',
      border: '1px solid #333',
      borderRadius: '15px',
      color: 'white',
      fontSize: '14px',
      outline: 'none'
    },
    btnSubmit: {
      background: 'white',
      color: 'black',
      border: 'none',
      padding: '14px',
      borderRadius: '16px',
      fontWeight: 'bold',
      width: '100%',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    btnCancel: {
      background: 'transparent',
      border: 'none',
      color: '#555',
      fontSize: '12px',
      width: '100%',
      marginTop: '15px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Banner al Perfil*/}
        <div style={styles.banner}>
           <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
             <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
           </svg>
        </div>

        <div style={styles.content}>
          <header style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '26px', margin: '0', fontWeight: '800' }}>Centro de Soporte</h2>
            <p style={{ color: '#666', fontSize: '13px', marginTop: '5px' }}>Estamos para ayudarte con tu música</p>
          </header>

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>ASUNTO</label>
            <input 
              name="subject"
              style={styles.input}
              placeholder="Ej: Error al subir canción"
              value={ticket.subject}
              onChange={handleChange}
              required 
            />

            <label style={styles.label}>MENSAJE DETALLADO</label>
            <textarea 
              name="message"
              style={{...styles.input, height: '110px', resize: 'none'}}
              placeholder="Explica qué sucede..."
              value={ticket.message}
              onChange={handleChange}
              required 
            />

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px', gap: '8px' }}>
              <div style={{ width: '6px', height: '6px', background: '#f59e0b', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>Borrador guardado automáticamente</span>
            </div>

            <button 
              type="submit" 
              style={styles.btnSubmit}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              ENVIAR TICKET
            </button>

            <button 
              type="button" 
              onClick={() => navigate("/dashboard")}
              style={styles.btnCancel}
              onMouseOver={(e) => e.target.style.color = '#888'}
              onMouseOut={(e) => e.target.style.color = '#555'}
            >
              CANCELAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SupportForm;