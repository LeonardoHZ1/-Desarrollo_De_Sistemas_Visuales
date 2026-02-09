const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    artista: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Playlist", PlaylistSchema);
