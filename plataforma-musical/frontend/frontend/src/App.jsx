import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
// --- IMPORTACIÓN DE PÁGINAS ---
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Playlist from "./pages/Playlist";   // Biblioteca + Drag & Drop Destino + PDF
import UploadSong from "./pages/UploadSong"; // Formulario Título/Artista
import Profile from "./pages/Profile";       // Formulario Perfil con Borrador
import Tickets from "./pages/Tickets"; // Verifica que tenga la 's'     // Formulario de Soporte/Solicitud

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="fade-in"> {/* Animación global de entrada */}
          <Routes>
            {/* --- RUTAS PÚBLICAS --- */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />

            {/* --- RUTAS PROTEGIDAS (RBAC - 4 ROLES) --- */}

            {/* 1. Acceso General (User, Artista, Admin, Moderador) */}
            <Route element={<ProtectedRoute allowedRoles={["user", "artista", "admin", "moderador"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/playlist" element={<Playlist />} />
            </Route>

            {/* 2. Soporte y Gestión (User para crear, Moderador/Admin para ver) */}
            <Route element={<ProtectedRoute allowedRoles={["user", "moderador", "admin"]} />}>
              <Route path="/tickets" element={<Tickets />} />
            </Route>

            {/* 3. Creación de Contenido (Solo Artistas y Admins) */}
            <Route element={<ProtectedRoute allowedRoles={["artista", "admin"]} />}>
              {/* "Ver Canciones" en el dashboard lleva a este formulario */}
              <Route path="/songs" element={<UploadSong />} />
            </Route>

            {/* Manejo de Rutas no existentes */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
