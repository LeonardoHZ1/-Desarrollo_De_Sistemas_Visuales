import { useState, useEffect } from "react";
import axios from "../api/axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useAuth } from "../context/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Playlist() {
  const { user } = useAuth(); 
  const [availableSongs, setAvailableSongs] = useState([]);
  const [myPlaylist, setMyPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get("/songs");
        setAvailableSongs(res.data);
      } catch (error) {
        console.error("Error cargando biblioteca:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  
  const deleteSongFromDB = async (id) => {
    if (window.confirm("¿Deseas eliminar esta canción permanentemente de la biblioteca global?")) {
      try {
        await axios.delete(`/songs/${id}`);
        
        setAvailableSongs(availableSongs.filter(s => s._id !== id));
        setMyPlaylist(myPlaylist.filter(s => s._id !== id));
      } catch (error) {
        console.error("Error al borrar:", error);
        alert("No se pudo eliminar de la base de datos.");
      }
    }
  };

  
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    
    if (source.droppableId === "library" && destination.droppableId === "playlist") {
      const songToAdd = availableSongs[source.index];
      if (!myPlaylist.find((s) => s._id === songToAdd._id)) {
        const newPlaylist = Array.from(myPlaylist);
        newPlaylist.splice(destination.index, 0, songToAdd);
        setMyPlaylist(newPlaylist);
      }
    }
    
    
    if (source.droppableId === "playlist" && destination.droppableId === "playlist") {
      const items = Array.from(myPlaylist);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setMyPlaylist(items);
    }
  };

  const removeFromPlaylist = (id) => {
    setMyPlaylist(myPlaylist.filter((s) => s._id !== id));
  };

  
  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Mi Selección Musical", 14, 20);

      const tableRows = myPlaylist.map((song, index) => [
        index + 1,
        song.title,
        song.artist
      ]);

      autoTable(doc, {
        startY: 30,
        head: [["#", "Título", "Artista"]],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [97, 212, 122] }
      });

      doc.save("Mi_Playlist.pdf");
    } catch (error) {
      console.error("Error PDF:", error);
    }
  };

  if (loading) return <div style={{color: "white", textAlign: "center", padding: "50px"}}>Cargando música...</div>;

  return (
    <div className="fade-in" style={{ padding: "30px", color: "white" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>🎵 Mi Playlist & Biblioteca</h1>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "30px", justifyContent: "center", flexWrap: "wrap" }}>
          
          {/* COLUMNA: BIBLIOTECA GLOBAL */}
          <div style={{ flex: "1", minWidth: "320px", maxWidth: "500px" }}>
            <h3 style={{ color: "var(--card-purple)", marginBottom: "15px" }}>📚 Canciones Disponibles</h3>
            <Droppable droppableId="library" isDropDisabled={true}>
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  style={{ background: "#181818", padding: "15px", borderRadius: "12px", minHeight: "500px", border: "1px solid #333" }}
                >
                  {availableSongs.map((song, index) => (
                    <Draggable key={song._id} draggableId={song._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            padding: "15px", margin: "0 0 12px 0",
                            background: "#282828", borderRadius: "8px",
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
                          }}
                        >
                          <div>
                            <div style={{fontWeight: "bold"}}>{song.title}</div>
                            <div style={{fontSize: "0.85rem", color: "#aaa"}}>{song.artist}</div>
                          </div>
                          
                          {/* Botón de eliminar permanente solo para Admin/Artista */}
                          {(user?.role === "admin" || user?.role === "artista") && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); deleteSongFromDB(song._id); }}
                              style={{ background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: "1.1rem" }}
                              onMouseEnter={(e) => e.target.style.color = "#ff4d4d"}
                              onMouseLeave={(e) => e.target.style.color = "#555"}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* COLUMNA: MI PLAYLIST */}
          <div style={{ flex: "1", minWidth: "320px", maxWidth: "500px" }}>
            <h3 style={{ color: "var(--card-green)", marginBottom: "15px" }}>🎧 Mi Playlist (Suelta aquí)</h3>
            <Droppable droppableId="playlist">
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  style={{ 
                    background: "#0f0f0f", padding: "15px", borderRadius: "12px", 
                    minHeight: "500px", border: "2px dashed #333" 
                  }}
                >
                  {myPlaylist.length === 0 && (
                    <p style={{textAlign: "center", color: "#444", marginTop: "100px"}}>Arrastra canciones de la biblioteca para empezar</p>
                  )}
                  {myPlaylist.map((song, index) => (
                    <Draggable key={`p-${song._id}`} draggableId={`p-${song._id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            padding: "15px", margin: "0 0 12px 0",
                            background: "#1e1e1e", borderRadius: "8px",
                            display: "flex", justifyContent: "space-between",
                            borderLeft: "5px solid var(--card-green)"
                          }}
                        >
                          <span>{song.title} - <small>{song.artist}</small></span>
                          <button onClick={() => removeFromPlaylist(song._id)} style={{color: "#ff4d4d", background: "none", border: "none", cursor: "pointer", fontWeight: "bold"}}>✕</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {myPlaylist.length > 0 && (
              <button 
                onClick={downloadPDF} 
                className="btn-primary" 
                style={{ marginTop: "25px", width: "100%", background: "var(--card-green)", color: "black", fontSize: "1.1rem" }}
              >
                📄 Descargar mi PDF
              </button>
            )}
          </div>

        </div>
      </DragDropContext>
    </div>
  );
}

export default Playlist;