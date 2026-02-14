
import React from 'react';
import Navbar from "../components/Navbar";

export default function AdminUsers() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Gestión de Usuarios (Vista de Admin)</h1>
        <p>Aquí el administrador podrá ver, editar o eliminar cuentas de usuario.</p>
      </div>
    </div>
  );
}