import { useState, useEffect } from "react";
import axios from "axios";

function UploadSong() {
  const [song, setSong] = useState(() => {
    const saved = localStorage.getItem("songDraft");
    return saved ? JSON.parse(saved) : { title: "", artist: "", genre: "" };
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("songDraft", JSON.stringify(song));
  }, [song]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      await axios.post("http://localhost:4000/api/songs", song, {
        withCredentials: true
      });
      setMessage("✅ ¡Canción agregada con éxito!");
      localStorage.removeItem("songDraft"); 
      setSong({ title: "", artist: "", genre: "" });
    } catch (error) {
      setMessage("❌ Error al guardar la canción.");
    }
  };

  return (
    <div className="fade-in min-h-screen flex items-center justify-center p-6">
      <div className="glass-form w-full max-w-md shadow-2xl" style={{ background: "#111", border: "1px solid #333" }}>
        
        {/* Icono SVG */}
        <div className="flex justify-center mb-6">
          <svg className="icon-float" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#61d47a" strokeWidth="1.5">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-6">Agregar Nueva Canción</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Título de la canción</label>
            <input 
              type="text" 
              className="input-field mt-1" 
              placeholder="Ej: Canción de ejemplo"
              value={song.title}
              required
              onChange={(e) => setSong({...song, title: e.target.value})}
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Nombre del Artista</label>
            <input 
              type="text" 
              className="input-field mt-1" 
              placeholder="Ej: Artista o Banda"
              value={song.artist}
              required
              onChange={(e) => setSong({...song, artist: e.target.value})}
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 uppercase font-bold ml-1">Género (opcional)</label>
            <input 
              type="text" 
              className="input-field mt-1" 
              placeholder="Ej: Rock"
              value={song.genre}
              onChange={(e) => setSong({...song, genre: e.target.value})}
            />
          </div>

          {message && (
            <p className={`text-center text-sm font-bold ${message.includes('✅') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <p className="pulse-draft text-center text-xs">● Los cambios se guardan como borrador</p>

          <button 
            type="submit" 
            className="w-full py-4 rounded-xl font-bold transition-all transform active:scale-95"
            style={{ background: "#61d47a", color: "#000" }}
          >
            Guardar Canción
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadSong;