import { Board } from "./components/Board";
import { AddMissionForm } from "./components/AddMissionForm";

function App() {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginTop: "20px",
        }}
      >
        Tablón de Misiones 🎮
      </h1>

      <AddMissionForm />
      <Board />
    </>
  );
}

export default App;
