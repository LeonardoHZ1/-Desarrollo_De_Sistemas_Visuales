import React from "react";

export default function Card(props: {
  task: { id: string; title: string; description?: string };
  from: "pending" | "inProgress" | "done";
  onDelete?: () => void;
}) {
  const { task, from, onDelete } = props;

  const handleDragStart = (e: React.DragEvent) => {
    const payload = JSON.stringify({ from, taskId: task.id });
    e.dataTransfer.setData("text/plain", payload);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onDelete) return;
    // Confirmación ya hecha en KanbanBoard, pero doble comprobación aquí
    if (window.confirm("¿Seguro que quieres eliminar esta tarea?")) {
      onDelete();
    }
  };

  return (
    <div className="kanban-card" draggable onDragStart={handleDragStart}>
      <div className="kanban-card-title">{task.title}</div>
      {task.description && <div className="kanban-card-desc">{task.description}</div>}
      <button className="btn-delete" onClick={handleDelete} aria-label="Eliminar tarea">×</button>
    </div>
  );
}
