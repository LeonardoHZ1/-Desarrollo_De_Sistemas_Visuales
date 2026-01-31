import { createContext, useContext, useEffect, useState } from "react";
import type { Mission, MissionStatus } from "../types/Mission";

interface MissionContextType {
  missions: Mission[];
  moveMission: (id: string, status: MissionStatus) => void;
  deleteMission: (id: string) => void;
}

const MissionContext = createContext<MissionContextType | null>(null);

const STORAGE_KEY = "missions";

const defaultMissions: Mission[] = [
  {
    id: crypto.randomUUID(),
    title: "Derrotar al jefe final",
    description: "Vencer al dragón del norte",
    status: "pending",
    type: "principal",
  },
  {
    id: crypto.randomUUID(),
    title: "Recolectar gemas",
    description: "Juntar 10 gemas mágicas",
    status: "in-progress",
    type: "secundaria",
  },
  {
    id: crypto.randomUUID(),
    title: "Hablar con el NPC",
    description: "Aceptar misión secundaria",
    status: "completed",
    type: "secundaria",
  },
];

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [missions, setMissions] = useState<Mission[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultMissions;
      const parsed = JSON.parse(stored) as Mission[];
      if (!Array.isArray(parsed) || parsed.length === 0) return defaultMissions;
      const validMissions = parsed.filter(
        (m) =>
          m.id &&
          m.status &&
          ["pending", "in-progress", "completed"].includes(m.status) &&
          ["principal", "secundaria"].includes(m.type)
      );
      return validMissions.length ? validMissions : defaultMissions;
    } catch {
      return defaultMissions;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
  }, [missions]);

  function moveMission(id: string, status: MissionStatus) {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  }

  function deleteMission(id: string) {
    setMissions((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <MissionContext.Provider value={{ missions, moveMission, deleteMission }}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMissions() {
  const context = useContext(MissionContext);
  if (!context)
    throw new Error("useMissions debe usarse dentro de MissionProvider");
  return context;
}
