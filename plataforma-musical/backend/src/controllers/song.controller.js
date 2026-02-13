import Song from "../models/Song.js";

// Asegúrate de que diga 'export' y que se llame 'getSongs'
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener canciones" });
  }
};

// ESTA ES LA QUE PROBABLEMENTE FALTA O TIENE OTRO NOMBRE
export const createSong = async (req, res) => {
  try {
    const { title, artist, genre } = req.body;
    const newSong = new Song({
      title,
      artist,
      genre,
      uploadedBy: req.user.id // Esto viene del middleware verifyToken
    });
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la canción" });
  }
};
