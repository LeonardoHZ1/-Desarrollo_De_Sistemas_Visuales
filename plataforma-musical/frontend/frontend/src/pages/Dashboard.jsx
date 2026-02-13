import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>

      <Link to="/songs">Ver Canciones</Link>
      <br />
      <Link to="/ticket">Crear Ticket</Link>
    </div>
  );
}

export default Dashboard;
