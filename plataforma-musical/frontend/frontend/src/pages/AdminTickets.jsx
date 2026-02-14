import { useEffect, useState } from "react";
import axios from "axios";

function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/tickets", {
          withCredentials: true
        });
        setTickets(res.data);
      } catch (error) {
        console.error("Error al obtener tickets", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="fade-in p-10 text-white min-h-screen">
      {/* Encabezado centrado */}
      <div className="flex flex-col items-center mb-10">
        <svg 
          width="60" height="60" viewBox="0 0 24 24" 
          fill="none" stroke="#8a8a22" strokeWidth="2" 
          className="icon-float mb-4"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h1 className="text-3xl font-bold border-b-2 border-yellow-600 pb-2">
          Gestión de Tickets (Staff)
        </h1>
      </div>

      {loading ? (
        <p className="text-center animate-pulse">Cargando reportes desde el servidor...</p>
      ) : (
        <div className="max-w-4xl mx-auto grid gap-6">
          {tickets.length > 0 ? (
            tickets.map((t) => (
              <div key={t._id} className="bg-zinc-900 p-6 rounded-2xl border-l-4 border-yellow-600 shadow-xl hover:bg-zinc-800 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-yellow-500">{t.title}</h3>
                  <span className="text-xs bg-zinc-800 px-3 py-1 rounded-full text-zinc-400">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-zinc-300 leading-relaxed mb-4">
                  {t.description}
                </p>
                <div className="text-sm text-zinc-500 flex items-center">
                  <span className="font-semibold text-zinc-400 mr-2">Usuario:</span>
                  {t.user?.username || "Admin / Usuario General"}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-zinc-900 rounded-3xl border-2 border-dashed border-zinc-800">
              <p className="text-zinc-500 text-lg">No hay tickets registrados en la base de datos.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminTickets;