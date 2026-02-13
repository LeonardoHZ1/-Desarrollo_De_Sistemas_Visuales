import { useState } from "react";
import axios from "../api/axios";

function UploadSong() {
  const [songData, setSongData] = useState({ title: "", artist: "", genre: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/songs", songData);
      alert("✅ Canción agregada a la biblioteca");
      setSongData({ title: "", artist: "", genre: "" });
    } catch (error) {
      console.error("Error al crear canción", error);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Agregar Nueva Canción</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input 
          type="text" placeholder="Título de la canción" required
          value={songData.title}
          onChange={(e) => setSongData({...songData, title: e.target.value})}
          style={{ padding: "10px" }}
        />
        <input 
          type="text" placeholder="Nombre del Artista" required
          value={songData.artist}
          onChange={(e) => setSongData({...songData, artist: e.target.value})}
          style={{ padding: "10px" }}
        />
        <input 
          type="text" placeholder="Género (opcional)"
          value={songData.genre}
          onChange={(e) => setSongData({...songData, genre: e.target.value})}
          style={{ padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px", background: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
          Guardar Canción
        </button>
      </form>
    </div>
  );
}

export default UploadSong;