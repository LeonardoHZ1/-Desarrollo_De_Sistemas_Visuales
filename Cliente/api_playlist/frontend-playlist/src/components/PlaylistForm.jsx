import { useState } from "react";
import { createSong } from "../api/playlist.api";

export default function PlaylistForm({ onSongAdded }) {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !artista) return;

    try {
      setLoading(true);
      await createSong({ titulo, artista });
      setTitulo("");
      setArtista("");
      setError("");
      onSongAdded();
    } catch {
      setError("Error al guardar la canción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        type="text"
        placeholder="Artista"
        value={artista}
        onChange={(e) => setArtista(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Guardando..." : "Agregar canción"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
