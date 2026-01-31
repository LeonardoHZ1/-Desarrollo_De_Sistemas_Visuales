import { useEffect, useState } from "react";
import FormularioEvento from "./FormularioEvento";
import ListaRegistros from "./ListaRegistros";
import "./App.css";

export type Registro = {
  nombre: string;
  correo: string;
  modalidad: string;
  fecha: string;
};

export default function App() {
  const [registros, setRegistros] = useState<Registro[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("registros");
    if (data) setRegistros(JSON.parse(data));
  }, []);

  const guardarRegistro = (registro: Registro) => {
    const nuevos = [...registros, registro];
    setRegistros(nuevos);
    localStorage.setItem("registros", JSON.stringify(nuevos));
  };

  const eliminarTodo = () => {
    localStorage.removeItem("registros");
    setRegistros([]);
  };

  return (
    <div className="app">
      <div className="layout">
        {/* SVG DESDE PUBLIC */}
        <img src="/event.svg" className="svg" alt="Evento" />

        <FormularioEvento onGuardar={guardarRegistro} />

        <ListaRegistros
          registros={registros}
          onEliminar={eliminarTodo}
        />
      </div>
    </div>
  );
}
