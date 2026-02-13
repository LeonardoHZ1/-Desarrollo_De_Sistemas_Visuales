import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Usamos el hook que creamos

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Extraemos 'signin' (la función) y 'user' (el estado) y 'errors' del contexto
  const { signin, user, errors: authErrors } = useAuth();
  const navigate = useNavigate();

  // EFECTO: Si el usuario ya existe (login exitoso), redirigir al dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validaciones básicas de Frontend
    if (!email.includes("@")) return alert("Email inválido");
    if (password.length < 6) return alert("Password mínimo 6 caracteres");

    // Llamamos a la función signin del Contexto
    // No necesitamos axios aquí, el Contexto ya lo hace
    await signin({ email, password });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Iniciar Sesión</h2>

      {/* Mostrar errores del backend si existen */}
      {authErrors && authErrors.map((error, i) => (
        <div key={i} style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      ))}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "8px" }}
        />

        <button type="submit" style={{ padding: "10px", cursor: "pointer", backgroundColor: "#007bff", color: "white", border: "none" }}>
          Entrar
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;
