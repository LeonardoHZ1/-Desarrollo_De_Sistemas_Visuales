import Song from "../models/Song.js"; // Coincide con tu archivo físico

export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSong = async (req, res) => {
  try {
    const { title, artist } = req.body;
    const newSong = new Song({ title, artist });
    await newSong.save();
    res.json(newSong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const songDeleted = await Song.findByIdAndDelete(req.params.id);
    if (!songDeleted) return res.status(404).json({ message: "Canción no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Error al borrar la canción" });
  }
};