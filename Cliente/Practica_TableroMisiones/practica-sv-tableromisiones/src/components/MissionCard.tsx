import type { Mission } from "../types/Mission";
import { useMissions } from "../context/MissionContext";

export function MissionCard({ mission }: { mission: Mission }) {
  const { deleteMission } = useMissions();

  function onDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData("missionId", mission.id);
  }

  const bgColor =
    mission.type === "principal" ? "#ef4444" : "#3b82f6"; // rojo principal, azul secundaria

  return (
    <div
      className="card"
      draggable
      onDragStart={onDragStart}
      style={{ backgroundColor: bgColor, position: "relative" }}
    >
      <h4>{mission.title}</h4>
      <p>{mission.description}</p>
      <button
        onClick={() => deleteMission(mission.id)}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          background: "transparent",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ✖
      </button>
    </div>
  );
}
