import type { Registro } from "./App";

type Props = {
  registros: Registro[];
  onEliminar: () => void;
};

export default function ListaRegistros({ registros, onEliminar }: Props) {
  return (
    <div className="card">
      <h3>Registros ({registros.length})</h3>

      {registros.length === 0 && <p>No hay registros aún</p>}

      <ul>
        {registros.map((r, i) => (
          <li key={i}>
            <b>{r.nombre}</b><br />
            {r.correo}<br />
            {r.modalidad}<br />
            {r.fecha}
          </li>
        ))}
      </ul>

      {registros.length > 0 && (
        <button className="danger" onClick={onEliminar}>
          Eliminar todos
        </button>
      )}
    </div>
  );
}
