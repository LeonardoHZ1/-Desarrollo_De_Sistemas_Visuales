import type { MissionStatus } from "../types/Mission";
import { useMissions } from "../context/MissionContext";
import { MissionCard } from "./MissionCard";

export function Column({
  title,
  status,
}: {
  title: string;
  status: MissionStatus;
}) {
  const { missions, moveMission } = useMissions();

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const id = e.dataTransfer.getData("missionId");
    if (id) moveMission(id, status);
  }

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h2>{title}</h2>
      {missions
        .filter((m) => m.status === status)
        .map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
    </div>
  );
}
