import { createContext, useContext, useEffect, useState } from "react";
import type { Mission, MissionStatus } from "../types/Mission";

interface CompletedMission extends Mission {
  completedAt: string;
  duration: number;
}

interface MissionContextType {
  missions: Mission[];
  completedMissions: CompletedMission[];
  moveMission: (id: string, status: MissionStatus) => void;
  deleteMission: (id: string) => void;
  completeMission: (id: string) => void;
  addMission: (mission: Mission) => void;
  clearCompleted: () => void;
}

const MissionContext = createContext<MissionContextType | null>(null);
const STORAGE_KEY = "missions";
const STORAGE_COMPLETED_KEY = "completedMissions";

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [missions, setMissions] = useState<Mission[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [completedMissions, setCompletedMissions] = useState<CompletedMission[]>(() => {
    const stored = localStorage.getItem(STORAGE_COMPLETED_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify(completedMissions));
  }, [completedMissions]);

  function moveMission(id: string, status: MissionStatus) {
    setMissions((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status, startTime: status === "in-progress" ? Date.now() : m.startTime }
          : m
      )
    );
  }

  function deleteMission(id: string) {
    setMissions((prev) => prev.filter((m) => m.id !== id));
    setCompletedMissions((prev) => prev.filter((m) => m.id !== id));
  }

  function completeMission(id: string) {
    setMissions((prev) => {
      const mission = prev.find((m) => m.id === id);
      if (!mission) return prev;

      const duration = mission.startTime ? Math.floor((Date.now() - mission.startTime) / 1000) : 0;
      const completed: CompletedMission = {
        ...mission,
        status: "completed",
        completedAt: new Date().toLocaleString(),
        duration,
      };

      // Evitamos duplicados
      setCompletedMissions((prevCompleted) => {
        if (prevCompleted.find((m) => m.id === mission.id)) return prevCompleted;
        return [...prevCompleted, completed];
      });

      return prev.filter((m) => m.id !== id);
    });
  }

  function addMission(mission: Mission) {
    setMissions((prev) => [...prev, mission]);
  }

  function clearCompleted() {
    setCompletedMissions([]);
  }

  return (
    <MissionContext.Provider value={{ missions, completedMissions, moveMission, deleteMission, completeMission, addMission, clearCompleted }}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMissions() {
  const context = useContext(MissionContext);
  if (!context) throw new Error("useMissions debe usarse dentro de MissionProvider");
  return context;
}
