const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
  }
};

module.exports = conectarDB;
