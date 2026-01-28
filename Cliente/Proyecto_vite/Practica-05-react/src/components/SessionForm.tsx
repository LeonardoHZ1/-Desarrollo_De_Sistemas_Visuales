import { useState, useEffect } from "react";
import "../styles/SessionForm.css";

interface SessionData {
  nombre: string;
  email: string;
  mensaje: string;
  fechaGuardado: string;
}

export function SessionForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [hasSession, setHasSession] = useState(false);

  // Detectar sesión al cargar el componente
  useEffect(() => {
    const savedSession = localStorage.getItem("userSession");
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession) as SessionData;
        setSessionData(parsedSession);
        setHasSession(true);
      } catch (error) {
        console.error("Error al cargar la sesión:", error);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSession: SessionData = {
      ...formData,
      fechaGuardado: new Date().toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    localStorage.setItem("userSession", JSON.stringify(newSession));
    setSessionData(newSession);
    setHasSession(true);
  };

  const handleClearSession = () => {
    localStorage.removeItem("userSession");
    setSessionData(null);
    setHasSession(false);
    setFormData({
      nombre: "",
      email: "",
      mensaje: "",
    });
  };

  return (
    <div className="session-form-container">
      {!hasSession ? (
        // LAYOUT DEL FORMULARIO (sin sesión)
        <div className="form-wrapper">
          <h2 className="form-title">Crear Nueva Sesión</h2>
          <p className="form-subtitle">
            Completa el formulario para guardar tus datos
          </p>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ingresa tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                placeholder="Escribe tu mensaje aquí..."
                rows={4}
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">
              Guardar Sesión
            </button>
          </form>
        </div>
      ) : (
        // LAYOUT DE SESIÓN GUARDADA
        <div className="session-display">
          <div className="session-badge">✓ Sesión Activa</div>

          <h2 className="session-title">Bienvenido, {sessionData?.nombre}!</h2>

          <div className="session-info">
            <div className="info-card">
              <span className="info-label">Nombre:</span>
              <span className="info-value">{sessionData?.nombre}</span>
            </div>

            <div className="info-card">
              <span className="info-label">Correo:</span>
              <span className="info-value">{sessionData?.email}</span>
            </div>

            <div className="info-card">
              <span className="info-label">Mensaje:</span>
              <p className="info-value message">{sessionData?.mensaje}</p>
            </div>

            <div className="info-card timestamp">
              <span className="info-label">Fecha de Guardado:</span>
              <span className="info-value">{sessionData?.fechaGuardado}</span>
            </div>
          </div>

          <button onClick={handleClearSession} className="btn-clear-session">
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
