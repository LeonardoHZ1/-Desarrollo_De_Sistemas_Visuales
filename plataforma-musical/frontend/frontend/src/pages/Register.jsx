import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  // Guardar borrador
  useEffect(() => {
    localStorage.setItem("draftRegister", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    const draft = localStorage.getItem("draftRegister");
    if (draft) setForm(JSON.parse(draft));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim())
      return setError("Nombre obligatorio");

    if (!form.email.includes("@"))
      return setError("Email inválido");

    if (form.password.length < 6)
      return setError("Password mínimo 6 caracteres");

    if (form.password !== form.confirmPassword)
      return setError("Las contraseñas no coinciden");

    try {
      await axios.post("/auth/register", form);
      localStorage.removeItem("draftRegister");
      navigate("/");
    } catch {
      setError("Error registrando usuario");
    }
  };

  return (
    <div>
      <h2>Registro</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Registrarse</button>
      </form>

      <p>
        ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
      </p>
    </div>
  );
}

export default Register;
