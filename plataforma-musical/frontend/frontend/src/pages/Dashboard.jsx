import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="fade-in" style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1 style={{ fontSize: "3rem" }}>Bienvenido, {user?.username}</h1>
      <p style={{ color: "#b3b3b3" }}>Rol: {user?.role}</p>
      
      <div className="dashboard-grid">
        <Link to="/playlist" className="dash-card" style={{ backgroundColor: "var(--card-green)" }}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          Mi Playlist
        </Link>

        <Link to="/profile" className="dash-card" style={{ backgroundColor: "var(--card-purple)" }}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Mi Perfil
        </Link>

        {(user?.role === "admin" || user?.role === "artista") && (
          <Link to="/songs" className="dash-card" style={{ backgroundColor: "var(--card-blue)" }}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ffee00" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Subir Canción
          </Link>
        )}

        <Link to="/tickets" className="dash-card" style={{ backgroundColor: "var(--card-orange)" }}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          Soporte
        </Link>
      </div>

      <button onClick={logout} className="btn-primary" style={{ marginTop: "20px" }}>CERRAR SESIÓN</button>
    </div>
  );
}

export default Dashboard;