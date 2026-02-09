const API_URL = import.meta.env.VITE_API_URL;

export const getSongs = async () => {
  const res = await fetch(`${API_URL}/playlist`);
  if (!res.ok) throw new Error("Error al obtener canciones");
  return res.json();
};

export const createSong = async (song) => {
  const res = await fetch(`${API_URL}/playlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });

  if (!res.ok) throw new Error("Error al guardar canción");
  return res.json();
};
