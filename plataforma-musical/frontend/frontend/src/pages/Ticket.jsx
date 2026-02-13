import { useState, useEffect } from "react";
import axios from "../api/axios";

function Ticket() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low"
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("draftTicket", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    const draft = localStorage.getItem("draftTicket");
    if (draft) setForm(JSON.parse(draft));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.title.length < 5)
      return setError("Título mínimo 5 caracteres");

    if (form.description.length < 10)
      return setError("Descripción mínima 10 caracteres");

    try {
      await axios.post("/tickets", form);
      localStorage.removeItem("draftTicket");
      setMessage("Ticket enviado correctamente");
      setError("");
    } catch {
      setError("Error enviando ticket");
    }
  };

  return (
    <div>
      <h2>Soporte</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>

        <button type="submit">Enviar Ticket</button>
      </form>
    </div>
  );
}

export default Ticket;
