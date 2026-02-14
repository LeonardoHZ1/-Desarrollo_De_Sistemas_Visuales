import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Playlist from "./pages/Playlist";
import UploadSong from "./pages/UploadSong";
import Profile from "./pages/Profile";
import Tickets from "./pages/Tickets";
import AdminTickets from "./pages/AdminTickets"; // Nuevo Import

function App() {
  return (
    <BrowserRouter>
      <div className="fade-in">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" />} />

          {/* RUTAS RBAC: Acceso General */}
          <Route element={<ProtectedRoute allowedRoles={["user", "artista", "admin", "moderador"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/tickets" element={<Tickets />} />
          </Route>

          {/* RUTAS RBAC: Solo Staff (Botón Amarillo) */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "moderador"]} />}>
            <Route path="/admin-tickets" element={<AdminTickets />} />
          </Route>

          {/* RUTAS RBAC: Solo Creadores (Botón Azul) */}
          <Route element={<ProtectedRoute allowedRoles={["artista", "admin"]} />}>
            <Route path="/songs" element={<UploadSong />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;