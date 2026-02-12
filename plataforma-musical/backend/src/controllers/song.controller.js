import Song from "../models/Song.js";
import PDFDocument from "pdfkit";

export const getSongs = async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
};

export const createSong = async (req, res) => {
  const { title, artist } = req.body;

  if (!title || !artist)
    return res.status(400).json({ message: "Datos incompletos" });

  const song = await Song.create({
    title,
    artist,
    createdBy: req.user.id
  });

  res.status(201).json(song);
};

export const updateSong = async (req, res) => {
  const song = await Song.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(song);
};

export const deleteSong = async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.json({ message: "Canción eliminada" });
};

export const exportSongsPDF = async (req, res) => {
  const songs = await Song.find();

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=songs.pdf");

  doc.pipe(res);

  doc.fontSize(18).text("Lista de Canciones", { align: "center" });
  doc.moveDown();

  songs.forEach((song, index) => {
    doc.fontSize(12).text(
      `${index + 1}. ${song.title} - ${song.artist}`
    );
  });

  doc.end();
};
