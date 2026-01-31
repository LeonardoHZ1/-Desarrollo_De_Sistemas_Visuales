import { Column } from "./Column";
import "../styles/board.css";

export function Board() {
  return (
    <div className="board">
      <Column title="Pendiente" status="pending" />
      <Column title="En proceso" status="in-progress" />
      <Column title="Completado" status="completed" />
    </div>
  );
}
