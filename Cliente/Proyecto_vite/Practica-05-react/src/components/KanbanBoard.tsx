import React, { useEffect, useState } from "react";
import Column from "./Column";
import NewTaskForm from "./NewTaskForm";
import "./Kanban.css";

type Task = { id: string; title: string; description?: string };
type ColId = "pending" | "inProgress" | "done";
type Columns = Record<ColId, Task[]>;

const STORAGE_KEY = "kanban_state";
const defaultState: Columns = { pending: [], inProgress: [], done: [] };

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultState;
    } catch {
      return defaultState;
    }
  });

  const [selected, setSelected] = useState<{ col: ColId; id: string } | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addTask = (col: ColId, title: string, desc?: string) => {
    const task: Task = { id: Date.now().toString(), title, description: desc };
    setColumns(prev => ({ ...prev, [col]: [task, ...prev[col]] }));
  };

  const moveTask = (from: ColId, to: ColId, taskId: string) => {
    if (from === to) return;
    setColumns(prev => {
      const src = [...prev[from]];
      const idx = src.findIndex(t => t.id === taskId);
      if (idx === -1) return prev;
      const [task] = src.splice(idx, 1);
      return { ...prev, [from]: src, [to]: [task, ...prev[to]] };
    });
    setSelected(null);
  };

  const deleteSelected = () => {
    if (!selected) return alert("Selecciona una tarea");
    if (!window.confirm("¿Eliminar tarea seleccionada?")) return;

    setColumns(prev => ({
      ...prev,
      [selected.col]: prev[selected.col].filter(t => t.id !== selected.id),
    }));
    setSelected(null);
  };

  return (
    <div className="kanban-root">
      <h2>Tablero Kanban</h2>

      <NewTaskForm onAdd={addTask} onDeleteSelected={deleteSelected} />

      <div className="kanban-board">
        {(["pending", "inProgress", "done"] as ColId[]).map(col => (
          <Column
            key={col}
            id={col}
            title={col === "pending" ? "Pendiente" : col === "inProgress" ? "En ejecución" : "Terminado"}
            tasks={columns[col]}
            selected={selected}
            onSelect={id => setSelected({ col, id })}
            onDropTask={moveTask}
          />
        ))}
      </div>
    </div>
  );
}
