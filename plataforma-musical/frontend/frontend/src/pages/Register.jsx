import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  // Estado inicial sincronizado con tu backend
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    password: "",
    role: "user" 
  });
  
  const [animate, setAnimate] = useState(false);
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData); 
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      // CAMBIO: Fondo negro puro para que coincida con el Login
      background: '#000000', 
      fontFamily: 'sans-serif',
      opacity: animate ? 1 : 0,
      transform: animate ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      background: 'rgba(18, 18, 20, 0.8)',
      backdropFilter: 'blur(12px)',
      borderRadius: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.9)',
      padding: '40px',
      color: 'white',
      textAlign: 'center'
    },
    label: {
      fontSize: '11px',
      color: '#a855f7',
      fontWeight: 'bold',
      display: 'block',
      textAlign: 'left',
      marginBottom: '8px',
      letterSpacing: '1px'
    },
    input: {
      width: '100%',
      padding: '14px',
      marginBottom: '18px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid #333',
      borderRadius: '15px',
      color: 'white',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '14px',
      marginBottom: '25px',
      background: '#121214',
      border: '1px solid #333',
      borderRadius: '15px',
      color: 'white',
      fontSize: '14px',
      outline: 'none',
      cursor: 'pointer'
    },
    btnSubmit: {
      background: 'linear-gradient(to right, #6366f1, #a855f7)',
      color: 'white',
      border: 'none',
      padding: '16px',
      borderRadius: '16px',
      fontWeight: 'bold',
      width: '100%',
      cursor: 'pointer',
      fontSize: '15px',
      transition: 'transform 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '28px', margin: '0', fontWeight: '800' }}>Crea tu Cuenta</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>Forma parte de la plataforma</p>
        </div>

        {/* Mostrar errores del AuthContext */}
        {registerErrors && registerErrors.map((error, i) => (
          <div key={i} style={{ color: '#ff4d4d', fontSize: '12px', marginBottom: '10px', background: 'rgba(255, 77, 77, 0.1)', padding: '8px', borderRadius: '10px' }}>
            {error}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>NOMBRE DE USUARIO</label>
          <input 
            name="username" 
            type="text" 
            placeholder="Tu nombre de usuario" 
            style={styles.input} 
            onChange={handleChange} 
            required 
          />

          <label style={styles.label}>EMAIL</label>
          <input 
            name="email" 
            type="email" 
            placeholder="correo@ejemplo.com" 
            style={styles.input} 
            onChange={handleChange} 
            required 
          />

          <label style={styles.label}>CONTRASEÑA</label>
          <input 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            style={styles.input} 
            onChange={handleChange} 
            required 
          />

          <label style={styles.label}>TIPO DE USUARIO</label>
          <select 
            name="role" 
            style={styles.select} 
            value={formData.role} 
            onChange={handleChange}
          >
            <option value="user">🎧 Oyente (User)</option>
            <option value="artista">🎸 Artista / Creador</option>
            <option value="moderador">🛡️ Moderador</option>
            <option value="admin">🔑 Administrador</option>
          </select>

          <button 
            type="submit" 
            style={styles.btnSubmit}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            REGISTRARME
          </button>
        </form>

        <p style={{ marginTop: '25px', fontSize: '13px', color: '#666' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 'bold' }}>Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;