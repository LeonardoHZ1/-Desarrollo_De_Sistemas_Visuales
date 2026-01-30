import React from "react";

type ColId = "pending" | "inProgress" | "done";

export default function Card(props: {
  task: { id: string; title: string; description?: string };
  from: ColId;
  selected: boolean;
  onSelect: () => void;
}) {
  const { task, from, selected, onSelect } = props;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ from, taskId: task.id })
    );
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`kanban-card card-${from} ${selected ? "card-selected" : ""}`}
      onClick={onSelect}
    >
      <div className="kanban-card-drag" draggable onDragStart={handleDragStart}>
        <div className="kanban-card-title">{task.title}</div>
      </div>

      {task.description && (
        <div className="kanban-card-desc">{task.description}</div>
      )}
    </div>
  );
}
