import React, { useState } from "react";
import Card from "./Card";

type Task = { id: string; title: string; description?: string };
type ColId = "pending" | "inProgress" | "done";

export default function Column(props: {
  id: ColId;
  title: string;
  tasks: Task[];
  selected: { col: ColId; id: string } | null;
  onSelect: (taskId: string) => void;
  onDropTask: (from: ColId, to: ColId, taskId: string) => void;
}) {
  const { id, title, tasks, selected, onSelect, onDropTask } = props;
  const [isOver, setIsOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const { from, taskId } = JSON.parse(e.dataTransfer.getData("text/plain"));
    onDropTask(from, id, taskId);
  };

  const getStatusClass = () => {
    if (tasks.length <= 2) return "col-free";
    if (tasks.length <= 5) return "col-occupied";
    return "col-saturated";
  };

  return (
    <div
      className={`kanban-column ${getStatusClass()} ${isOver ? "col-hover" : ""}`}
      onDragOver={e => {
        e.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
    >
      <div className="kanban-column-header">
        <h3>{title}</h3>
        <span className="count">{tasks.length}</span>
      </div>

      <div className="kanban-column-body">
        {tasks.map(t => (
          <Card
            key={t.id}
            task={t}
            from={id}
            selected={selected?.id === t.id && selected.col === id}
            onSelect={() => onSelect(t.id)}
          />
        ))}
      </div>
    </div>
  );
}
