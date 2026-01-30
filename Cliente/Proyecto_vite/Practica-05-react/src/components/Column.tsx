import React from "react";
import Card from "./Card";

type Task = { id: string; title: string; description?: string };

export default function Column(props: {
  id: "pending" | "inProgress" | "done";
  title: string;
  tasks: Task[];
  onDropTask: (fromId: "pending" | "inProgress" | "done", taskId: string) => void;
  onDeleteTask?: (colId: "pending" | "inProgress" | "done", taskId: string) => void;
}) {
  const { id, title, tasks, onDropTask, onDeleteTask } = props;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const payload = e.dataTransfer.getData("text/plain");
      const { from, taskId } = JSON.parse(payload);
      onDropTask(from, taskId);
    } catch (err) {
      // ignore
    }
  };

  const getStatusClass = () => {
    if (tasks.length <= 2) return "col-free";
    if (tasks.length <= 5) return "col-occupied";
    return "col-saturated";
  };

  return (
    <div className={`kanban-column ${getStatusClass()}`} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="kanban-column-header">
        <h3>{title}</h3>
        <span className="count">{tasks.length}</span>
      </div>

      <div className="kanban-column-body">
        {tasks.map((t) => (
          <Card key={t.id} task={t} from={id} onDelete={() => onDeleteTask && onDeleteTask(id, t.id)} />
        ))}
      </div>
    </div>
  );
}
