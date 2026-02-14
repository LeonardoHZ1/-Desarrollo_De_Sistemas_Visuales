import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false);
  
  const { signin, user, errors: authErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) return alert("Email inválido");
    if (password.length < 6) return alert("Password mínimo 6 caracteres");

    await signin({ email, password });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      // CAMBIO: De radial-gradient a negro sólido para un look más limpio
      background: '#000000', 
      fontFamily: 'sans-serif',
      opacity: animate ? 1 : 0,
      transform: animate ? 'scale(1)' : 'scale(0.95)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    card: {
      width: '100%',
      maxWidth: '400px',
      background: 'rgba(18, 18, 20, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
      padding: '40px',
      color: 'white',
      textAlign: 'center'
    },
    logoContainer: {
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
      borderRadius: '20px',
      margin: '0 auto 25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      width: '100%',
      padding: '14px',
      marginBottom: '15px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid #333',
      borderRadius: '15px',
      color: 'white',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    btnSubmit: {
      background: 'linear-gradient(to right, #6366f1, #a855f7)',
      color: 'white',
      border: 'none',
      padding: '15px',
      borderRadius: '16px',
      fontWeight: 'bold',
      width: '100%',
      cursor: 'pointer',
      fontSize: '15px',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        </div>

        <h2 style={{ fontSize: '28px', margin: '0 0 10px 0', fontWeight: '800' }}>¡Hola de nuevo!</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>Ingresa a tu cuenta de música</p>

        {authErrors && authErrors.map((error, i) => (
          <div key={i} style={{ color: '#ff4d4d', fontSize: '12px', marginBottom: '10px', background: 'rgba(255, 77, 77, 0.1)', padding: '8px', borderRadius: '10px' }}>
            {error}
          </div>
        ))}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.btnSubmit}>
            ENTRAR
          </button>
        </form>

        <p style={{ marginTop: '25px', fontSize: '13px', color: '#666' }}>
          ¿No tienes cuenta? <Link to="/register" style={{ color: '#a855f7', textDecoration: 'none', fontWeight: 'bold' }}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;