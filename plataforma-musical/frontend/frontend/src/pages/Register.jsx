import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "user" });

  const handleRegister = (e) => {
    e.preventDefault();
    
    // VALIDACIÓN (Punto de la Rúbrica)
    if (formData.password.length < 6) {
      return alert("La contraseña debe tener al menos 6 caracteres.");
    }
    if (!formData.email.includes("@")) {
      return alert("Ingresa un correo electrónico válido.");
    }

    console.log("Registrando:", formData);
    alert("Usuario registrado con éxito (Simulado)");
  };

  return (
    <div className="form-card fade-in">
      <h2 style={{ color: "var(--primary)" }}>Crear Cuenta</h2>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column" }}>
        <input 
          type="text" placeholder="Nombre de usuario" required
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          className="hover-scale"
        />
        <input 
          type="email" placeholder="Correo Electrónico" required
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="hover-scale"
        />
        <input 
          type="password" placeholder="Contraseña (mín. 6 caracteres)" required
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="hover-scale"
        />
        <select 
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          style={{ padding: "10px", margin: "10px 0", borderRadius: "8px" }}
        >
          <option value="user">Usuario Oyente</option>
          <option value="artista">Artista</option>
          <option value="moderador">Moderador</option>
        </select>
        
        <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>Registrarse</button>
      </form>
      <p style={{ marginTop: "20px", fontSize: "0.9rem" }}>
        ¿Ya tienes cuenta? <Link to="/login" style={{ color: "var(--primary)" }}>Inicia sesión</Link>
      </p>
    </div>
  );
}

export default Register;