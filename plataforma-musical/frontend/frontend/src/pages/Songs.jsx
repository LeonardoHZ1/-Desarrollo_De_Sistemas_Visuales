import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

function Songs() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const getSongs = async () => {
    try {
      const res = await axios.get("/songs");
      setSongs(res.data);
    } catch (error) {
      alert("Error al cargar canciones");
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/songs", { title, artist });
      setTitle("");
      setArtist("");
      getSongs();
    } catch (error) {
      alert("No tienes permisos para crear canciones");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/songs/${id}`);
      getSongs();
    } catch (error) {
      alert("Solo admin puede eliminar");
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Songs</h2>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Artista"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <button type="submit">Crear</button>
      </form>

      <ul>
        {songs.map((song) => (
          <li key={song._id}>
            {song.title} - {song.artist}
            <button onClick={() => handleDelete(song._id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Songs;
