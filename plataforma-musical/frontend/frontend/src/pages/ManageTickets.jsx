
import React from 'react';
import Navbar from "../components/Navbar";

export default function ManageTickets() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Gestión de Tickets (Vista de Moderador)</h1>
        <p>Aquí se listarán todos los tickets enviados por los usuarios para su revisión.</p>
      </div>
    </div>
  );
}