import { useEffect, useState } from "react";

export default function FormularioEvento() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [modalidad, setModalidad] = useState("Presencial");
  const [acepta, setAcepta] = useState(false);

  const [progreso, setProgreso] = useState(0);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const valido =
    nombre.length >= 3 &&
    correo.includes("@") &&
    correo.includes(".") &&
    acepta;

  // Simulación de guardado
  useEffect(() => {
    if (!guardando) return;

    if (progreso < 100) {
      const timer = setTimeout(() => {
        setProgreso((p) => p + 20);
      }, 300);
      return () => clearTimeout(timer);
    }

    // Guardar en localStorage
    const registro = {
      nombre,
      correo,
      modalidad,
      fecha: new Date().toLocaleString(),
    };

    const registrosPrevios =
      JSON.parse(localStorage.getItem("registros") || "[]");

    localStorage.setItem(
      "registros",
      JSON.stringify([...registrosPrevios, registro])
    );

    setMensaje("✅ Registro almacenado correctamente");
    setGuardando(false);

    // Limpiar formulario
    setNombre("");
    setCorreo("");
    setModalidad("Presencial");
    setAcepta(false);
    setTimeout(() => setMensaje(""), 3000);
  }, [progreso, guardando]);

  const registrar = () => {
    setProgreso(0);
    setMensaje("");
    setGuardando(true);
  };

  return (
    <div className="card">
      <h2>Registro a Evento</h2>

      <label>
        Nombre:
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Ana López"
        />
      </label>

      <label>
        Correo:
        <input
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="correo@ejemplo.com"
        />
      </label>

      <label>
        Modalidad:
        <select
          value={modalidad}
          onChange={(e) => setModalidad(e.target.value)}
        >
          <option>Presencial</option>
          <option>En línea</option>
        </select>
      </label>

      <label className="check">
        <input
          type="checkbox"
          checked={acepta}
          onChange={(e) => setAcepta(e.target.checked)}
        />
        Acepto términos y condiciones
      </label>

      <button disabled={!valido || guardando} onClick={registrar}>
        Registrar
      </button>

      {!valido && (
        <p className="error">
          Nombre ≥3, correo válido y aceptar términos
        </p>
      )}

      {guardando && (
        <>
          <p>Guardando registro: {progreso}%</p>
          <progress value={progreso} max={100}></progress>
        </>
      )}

      {mensaje && <p className="success">{mensaje}</p>}
    </div>
  );
}
