export type MissionStatus = "pending" | "in-progress" | "completed";
export type MissionType = "principal" | "secundaria";

export interface Mission {
  id: string;
  title: string;
  description: string;
  status: MissionStatus;
  type: MissionType;
  startTime?: number; // para temporizador
}
