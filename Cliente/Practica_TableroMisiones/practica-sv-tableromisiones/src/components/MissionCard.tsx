import { useEffect, useState } from "react";
import type { Mission } from "../types/Mission";
import { useMissions } from "../context/MissionContext";

export function MissionCard({ mission }: { mission: Mission }) {
  const { deleteMission } = useMissions();
  const [timer, setTimer] = useState(0);
  const [delay] = useState(Math.random() * 0.3); // animación aleatoria

  useEffect(() => {
    if (mission.status !== "in-progress" || !mission.startTime) return;
    const interval = setInterval(() => {
      setTimer(Math.floor((Date.now() - mission.startTime!) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [mission]);

  function onDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData("missionId", mission.id);
  }

  const bgColor = mission.type === "principal" ? "#ef4444" : "#3b82f6";

  return (
    <div
      className="card"
      draggable
      onDragStart={onDragStart}
      style={{
        backgroundColor: bgColor,
        position: "relative",
        animationDelay: `${delay}s`,
      }}
    >
      <h4>{mission.title}</h4>
      <p>{mission.description}</p>
      {mission.status === "in-progress" && <p>⏱ {timer}s</p>}
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
