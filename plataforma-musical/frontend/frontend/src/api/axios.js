import axios from "axios";

const instance = axios.create({
  // Asegúrate de que el puerto 4000 coincida con tu server.js
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // Esto es vital para que las cookies funcionen
});

export default instance;