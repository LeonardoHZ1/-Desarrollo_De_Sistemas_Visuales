// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 1. Importa tu Provider
import { AuthProvider } from "./context/AuthContext"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. Envuelve la App con el Provider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);