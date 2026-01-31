import { useEffect, useState } from "react";
import type { Mission } from "../types/Mission";
import { useMissions } from "../context/MissionContext";

export function MissionCard({ mission }: { mission: Mission }) {
  const { deleteMission, completeMission } = useMissions();
  const [timer, setTimer] = useState(0);
  const [delay] = useState(Math.random() * 0.3);

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
      style={{ backgroundColor: bgColor, position: "relative", animationDelay: `${delay}s` }}
    >
      <h4>{mission.title}</h4>
      <p>{mission.description}</p>
      {mission.status === "in-progress" && <p>⏱ {timer}s</p>}

      <div style={{ position: "absolute", top: "5px", right: "5px", display: "flex", gap: "5px" }}>
        <button
          onClick={() => completeMission(mission.id)}
          style={{ background: "transparent", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}
        >
          ✅
        </button>
        <button
          onClick={() => deleteMission(mission.id)}
          style={{ background: "transparent", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}
        >
          ✖
        </button>
      </div>
    </div>
  );
}
