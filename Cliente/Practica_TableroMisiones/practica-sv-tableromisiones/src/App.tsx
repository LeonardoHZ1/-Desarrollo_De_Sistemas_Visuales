import { useEffect } from "react";
import { Board } from "./components/Board";
import { AddMissionForm } from "./components/AddMissionForm";
import { CompletedMissions } from "./components/CompletedMissions";
import RPGHero from "./assets/RPGHero.svg";

function App() {
  useEffect(() => {
    const container = document.querySelector(".fire-particles");
    if (!container) return;
    for (let i = 0; i < 50; i++) {
      const span = document.createElement("span");
      span.style.left = `${Math.random() * 100}%`;
      span.style.animationDuration = `${3 + Math.random() * 3}s`;
      span.style.width = `${2 + Math.random() * 3}px`;
      span.style.height = span.style.width;
      container.appendChild(span);
    }
  }, []);

  return (
    <>
      <div className="fire-particles"></div>
    <h1 className="title-medieval" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <img src={RPGHero} width={300} height={200} alt="Protagonista RPG" />
  ----------Tablón de Misiones----------
</h1>
      <AddMissionForm />
      <Board />
      <CompletedMissions />
    </>
  );
}

export default App;
