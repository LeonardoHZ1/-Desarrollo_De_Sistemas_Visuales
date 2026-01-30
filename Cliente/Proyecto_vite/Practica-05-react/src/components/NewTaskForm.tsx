import React, { useState } from "react";

type ColId = "pending" | "inProgress" | "done";

export default function NewTaskForm(props: {
  onAdd: (col: ColId, title: string, desc?: string) => void;
  onDeleteSelected: () => void;
}) {
  const { onAdd, onDeleteSelected } = props;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [col, setCol] = useState<ColId>("pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Título requerido");
    onAdd(col, title.trim(), desc.trim() || undefined);
    setTitle("");
    setDesc("");
    setCol("pending");
  };

  return (
    <form className={`newtask-form preview-${col}`} onSubmit={handleSubmit}>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Descripción" value={desc} onChange={e => setDesc(e.target.value)} />
      <select value={col} onChange={e => setCol(e.target.value as ColId)}>
        <option value="pending">Pendiente</option>
        <option value="inProgress">En ejecución</option>
        <option value="done">Terminado</option>
      </select>
      <button type="submit">Crear</button>
      <button type="button" className="btn-danger" onClick={onDeleteSelected}>
        Eliminar seleccionada
      </button>
    </form>
  );
}
