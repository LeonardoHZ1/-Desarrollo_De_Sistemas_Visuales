import React, { useEffect, useState } from "react";
import Column from "./Column";
import NewTaskForm from "./NewTaskForm";
import "./Kanban.css";

type Task = { id: string; title: string; description?: string };
type Columns = {
  pending: Task[];
  inProgress: Task[];
  done: Task[];
};

const STORAGE_KEY = "kanban_state";

const defaultState: Columns = { pending: [], inProgress: [], done: [] };

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultState;
    } catch (e) {
      return defaultState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId: keyof Columns, title: string, description?: string) => {
    const task: Task = { id: Date.now().toString(), title, description };
    setColumns((prev) => ({ ...prev, [columnId]: [task, ...prev[columnId]] }));
    // Mensaje de confirmación al crear
    window.alert("Tarea creada");
  };

  const moveTask = (from: keyof Columns, to: keyof Columns, taskId: string) => {
    if (from === to) return;
    setColumns((prev) => {
      const source = [...prev[from]];
      const idx = source.findIndex((t) => t.id === taskId);
      if (idx === -1) return prev;
      const [task] = source.splice(idx, 1);
      const dest = [task, ...prev[to]];
      return { ...prev, [from]: source, [to]: dest } as Columns;
    });
  };

  const deleteTask = (from: keyof Columns, taskId: string) => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    setColumns((prev) => {
      const source = prev[from].filter((t) => t.id !== taskId);
      return { ...prev, [from]: source } as Columns;
    });
  };

  return (
    <div className="kanban-root">
      <h2>Tablero Kanban</h2>
      <NewTaskForm onAdd={addTask} />

      <div className="kanban-board">
        <Column
          id="pending"
          title="Pendiente"
          tasks={columns.pending}
          onDropTask={(fromId: keyof Columns, taskId: string) => moveTask(fromId, "pending", taskId)}
          onDeleteTask={(colId: keyof Columns, taskId: string) => deleteTask(colId, taskId)}
        />

        <Column
          id="inProgress"
          title="En Ejecucion"
          tasks={columns.inProgress}
          onDropTask={(fromId: keyof Columns, taskId: string) => moveTask(fromId, "inProgress", taskId)}
          onDeleteTask={(colId: keyof Columns, taskId: string) => deleteTask(colId, taskId)}
        />

        <Column
          id="done"
          title="Terminado"
          tasks={columns.done}
          onDropTask={(fromId: keyof Columns, taskId: string) => moveTask(fromId, "done", taskId)}
          onDeleteTask={(colId: keyof Columns, taskId: string) => deleteTask(colId, taskId)}
        />
      </div>
    </div>
  );
}
