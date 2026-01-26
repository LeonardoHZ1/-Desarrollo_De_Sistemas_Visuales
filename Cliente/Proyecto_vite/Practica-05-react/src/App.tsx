import { useState } from "react";
import "./App.css";
import zeldaLogo from "./assets/react.svg";

function App() {
  const [newGame, setNewGame] = useState(false);
  const [mensaje, setMensaje] = useState("Reanudando aventura...");

  return (
    <div className="zelda-container">

      {/* PARTÍCULAS (fondo real, no layout) */}
      <div className="fire-layer">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="ember" />
        ))}
      </div>

      {/* LOGOS */}
      <div className="logos">
        {!newGame && (
          <img
            src={zeldaLogo}
            className="logo zelda-logo"
            alt="Zelda Logo"
          />
        )}

        {newGame && (
          <img
            src="/vite.svg"
            className="logo link-logo"
            alt="Link"
          />
        )}
      </div>

      <h1 className="zelda-title">TEARS OF THE KINGDOM</h1>
      <p className="zelda-subtitle">{mensaje}</p>

      <div className="zelda-menu">
        <button
          onClick={() => {
            setNewGame(false);
            setMensaje("Continuando tu aventura...");
          }}
        >
          Continuar
        </button>

        <button
          onClick={() => {
            setNewGame(true);
            setMensaje("El héroe despierta...");
          }}
        >
          Nueva partida
        </button>

        <button onClick={() => setMensaje("Abriendo opciones...")}>
          Opciones
        </button>
      </div>

      <p className="read-the-docs">Selecciona una opción</p>
    </div>
  );
}

export default App;
