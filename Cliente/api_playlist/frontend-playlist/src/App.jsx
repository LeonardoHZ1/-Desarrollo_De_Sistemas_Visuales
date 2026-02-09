import { useEffect, useState } from "react";
import { getSongs } from "./api/playlist.api";
import PlaylistForm from "./components/PlaylistForm";
import PlaylistList from "./components/PlaylistList";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSongs = async () => {
    try {
      setLoading(true);
      const data = await getSongs();
      setSongs(data);
      setError("");
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSongs();
  }, []);

  return (
    <div className="container">
      <h1>🎵 Mi Playlist</h1>

      <PlaylistForm onSongAdded={loadSongs} />

      {loading && <p className="loader">Cargando canciones...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && <PlaylistList songs={songs} />}
    </div>
  );
}
