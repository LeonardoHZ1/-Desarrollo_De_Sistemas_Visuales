import { useState } from "react";
import { useMissions } from "../context/MissionContext";
import type { MissionStatus, MissionType } from "../types/Mission";

export function AddMissionForm() {
  const { missions, moveMission } = useMissions();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<MissionStatus>("pending");
  const [type, setType] = useState<MissionType>("principal");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Debes ingresar título y descripción");
      return;
    }

    const newMission = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      type,
    };

    const updatedMissions = [...missions, newMission];
    localStorage.setItem("missions", JSON.stringify(updatedMissions));
    moveMission(newMission.id, newMission.status);

    setTitle("");
    setDescription("");
    setStatus("pending");
    setType("principal");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#1e293b",
        padding: "15px",
        borderRadius: "10px",
        margin: "20px auto",
        maxWidth: "400px",
        color: "white",
      }}
    >
      <h3>Agregar Nueva Misión</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as MissionStatus)}
        style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
      >
        <option value="pending">Pendiente</option>
        <option value="in-progress">En Proceso</option>
        <option value="completed">Completado</option>
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value as MissionType)}
        style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
      >
        <option value="principal">Principal</option>
        <option value="secundaria">Secundaria</option>
      </select>

      <button type="submit" style={{ width: "100%", padding: "10px" }}>
        Agregar Misión
      </button>
    </form>
  );
}
