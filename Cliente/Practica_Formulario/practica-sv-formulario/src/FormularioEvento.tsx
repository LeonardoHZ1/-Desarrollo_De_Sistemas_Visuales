import { useState } from "react";
import type { Registro } from "./App";

type Props = {
  onGuardar: (registro: Registro) => void;
};

export default function FormularioEvento({ onGuardar }: Props) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [modalidad, setModalidad] = useState("Presencial");
  const [acepta, setAcepta] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [guardando, setGuardando] = useState(false);

  const valido =
    nombre.trim().length >= 3 &&
    correo.includes("@") &&
    correo.includes(".") &&
    acepta;

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valido) return;

    setGuardando(true);
    setProgreso(0);

    let p = 0;
    const intervalo = setInterval(() => {
      p += 20;
      setProgreso(p);

      if (p >= 100) {
        clearInterval(intervalo);

        onGuardar({
          nombre,
          correo,
          modalidad,
          fecha: new Date().toLocaleString(),
        });

        setNombre("");
        setCorreo("");
        setModalidad("Presencial");
        setAcepta(false);
        setGuardando(false);
        setProgreso(0);
      }
    }, 300);
  };

  const color =
    progreso < 40 ? "rojo" : progreso < 80 ? "amarillo" : "verde";

  return (
    <div className="card">
      <h2>Registro a Evento</h2>

      <form onSubmit={enviar}>
        <label>
          Nombre
          <input value={nombre} onChange={e => setNombre(e.target.value)} />
        </label>

        <label>
          Correo
          <input value={correo} onChange={e => setCorreo(e.target.value)} />
        </label>

        <label>
          Modalidad
          <select value={modalidad} onChange={e => setModalidad(e.target.value)}>
            <option>Presencial</option>
            <option>En línea</option>
          </select>
        </label>

        <label className="check">
          <input
            type="checkbox"
            checked={acepta}
            onChange={e => setAcepta(e.target.checked)}
          />
          Acepto términos
        </label>

        <button disabled={!valido || guardando}>Registrar</button>
      </form>

      {!valido && (
        <p className="error">Completa todos los campos correctamente</p>
      )}

      {guardando && (
        <div className="barra">
          <div
            className={`barra-progreso ${color}`}
            style={{ width: `${progreso}%` }}
          >
            {progreso}%
          </div>
        </div>
      )}
    </div>
  );
}
