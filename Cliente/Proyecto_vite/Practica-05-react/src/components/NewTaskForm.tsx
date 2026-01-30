import React, { useState } from "react";

export default function NewTaskForm(props: { onAdd: (col: "pending" | "inProgress" | "done", title: string, desc?: string) => void }) {
  const { onAdd } = props;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [col, setCol] = useState<"pending" | "inProgress" | "done">("pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      window.alert("El título es requerido");
      return;
    }
    onAdd(col, title.trim(), desc.trim() || undefined);
    setTitle("");
    setDesc("");
    setCol("pending");
  };

  return (
    <form className="newtask-form" onSubmit={handleSubmit}>
      <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Descripción (opcional)" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <select value={col} onChange={(e) => setCol(e.target.value as any)}>
        <option value="pending">Pendiente</option>
        <option value="inProgress">En Ejecucion</option>
        <option value="done">Terminado</option>
      </select>
      <button type="submit">Crear tarea</button>
    </form>
  );
}
