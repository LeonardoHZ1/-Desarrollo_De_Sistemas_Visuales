import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // ESTO HACE QUE EL 401 DESAPAREZCA
});

export default instance;