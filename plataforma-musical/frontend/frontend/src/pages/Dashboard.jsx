import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout, loading } = useAuth();

  if (loading) return <h1 style={{ color: "white", textAlign: "center" }}>Cargando...</h1>;

  // ROLES DEFINIDOS: admin, artista, fan, moderador
  const isElevated = user?.role === "admin" || user?.role === "artista";
  const isStaff = user?.role === "admin" || user?.role === "moderador";

  return (
    <div className="fade-in" style={{ textAlign: "center", color: "white", padding: "50px" }}>
      <h1>Panel de Control</h1>
      <p>Bienvenido: <strong>{user?.username}</strong> (Rol: <span style={{ color: "var(--card-green)" }}>{user?.role}</span>)</p>
      
      <div className="dashboard-grid">
        {/* Pantalla para todos los usuarios */}
        <Link to="/playlist" className="dash-card card-green">🎵 Mi Playlist</Link>
        <Link to="/profile" className="dash-card card-purple">👤 Perfil</Link>
        <Link to="/tickets" className="dash-card card-orange">🛠️ Soporte</Link>

        {/* Pantalla específica para Admin y Artistas */}
        {isElevated && (
          <Link to="/songs" className="dash-card card-blue">➕ Gestionar Música</Link>
        )}

        {/* Pantalla específica para Moderadores/Admin */}
        {isStaff && (
          <Link to="/admin-tickets" className="dash-card card-orange" style={{ filter: "hue-rotate(45deg)" }}>📋 Ver Tickets (Staff)</Link>
        )}
      </div>

      <button onClick={logout} className="btn-primary" style={{ marginTop: "40px", padding: "10px 40px" }}>
        Cerrar Sesión
      </button>
    </div>
  );
}
export default Dashboard;