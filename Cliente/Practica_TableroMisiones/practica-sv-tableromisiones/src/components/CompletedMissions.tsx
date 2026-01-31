import { useMissions } from "../context/MissionContext";

export function CompletedMissions() {
  const { completedMissions, clearCompleted } = useMissions();

  if (!completedMissions.length) return null;

  return (
    <div style={{ margin: "20px auto", maxWidth: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ textAlign: "center" }}>Misiones Completadas</h2>
        <button
          onClick={clearCompleted}
          style={{ background: "#ef4444", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
        >
          Limpiar tabla
        </button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "rgba(92,69,45,0.85)", color: "#f8e9c1" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #f8e9c1", padding: "5px" }}>Título</th>
            <th style={{ border: "1px solid #f8e9c1", padding: "5px" }}>Tipo</th>
            <th style={{ border: "1px solid #f8e9c1", padding: "5px" }}>Completado</th>
            <th style={{ border: "1px solid #f8e9c1", padding: "5px" }}>Duración</th>
          </tr>
        </thead>
        <tbody>
          {completedMissions.map((m) => (
            <tr key={m.id}>
              <td style={{ border: "1px solid #f8e9c1", padding: "5px" }}>{m.title}</td>
              <td style={{ border: "1px solid #f8e9c1", padding: "5px" }}>{m.type}</td>
              <td style={{ border: "1px solid #f8e9c1", padding: "5px" }}>{m.completedAt}</td>
              <td style={{ border: "1px solid #f8e9c1", padding: "5px" }}>{m.duration}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
