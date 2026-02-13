import { useEffect, useState } from "react";
import axios from "../api/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Playlist() {
  const [availableSongs, setAvailableSongs] = useState([]);
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    axios.get("/songs").then(res => setAvailableSongs(res.data));
  }, []);

  const onDrop = (e) => {
    const song = JSON.parse(e.dataTransfer.getData("song"));
    if (!myPlaylist.find(s => s._id === song._id)) setMyPlaylist([...myPlaylist, song]);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("MI PLAYLIST", 14, 15);
    doc.autoTable({ head: [['Título', 'Artista']], body: myPlaylist.map(s => [s.title, s.artist]) });
    doc.save("playlist.pdf");
  };

  return (
    <div className="fade-in" style={{ display: "flex", gap: "20px", padding: "40px" }}>
      <div style={{ flex: 1, background: "#181818", padding: "20px", borderRadius: "15px" }}>
        <h3>🎵 Biblioteca Global</h3>
        {availableSongs.map(s => (
          <div key={s._id} draggable onDragStart={(e) => e.dataTransfer.setData("song", JSON.stringify(s))} style={{ padding: "10px", borderBottom: "1px solid #333", cursor: "grab" }}>
            {s.title} - {s.artist}
          </div>
        ))}
      </div>

      <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} style={{ flex: 1, border: "2px dashed var(--card-green)", padding: "20px", borderRadius: "15px", textAlign: "center" }}>
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="var(--card-green)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M10 8l6 4-6 4V8z"></path></svg>
        <h3>Mi Selección Personal</h3>
        {myPlaylist.map(s => <div key={s._id} style={{ color: "var(--card-green)" }}>{s.title}</div>)}
        {myPlaylist.length > 0 && <button onClick={exportPDF} className="btn-primary" style={{ background: "var(--card-green)", marginTop: "20px" }}>Generar PDF</button>}
      </div>
    </div>
  );
}

export default Playlist;