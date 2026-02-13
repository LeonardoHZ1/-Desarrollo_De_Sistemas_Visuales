import { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profileDraft");
    return saved ? JSON.parse(saved) : { name: "", bio: "" };
  });

  useEffect(() => {
    localStorage.setItem("profileDraft", JSON.stringify(profile));
  }, [profile]);

  return (
    <div className="fade-in" style={{ maxWidth: "500px", margin: "50px auto", padding: "30px", background: "#181818", borderRadius: "15px", textAlign: "center" }}>
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--card-purple)" strokeWidth="2" style={{ marginBottom: "20px" }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      <h2 style={{ color: "var(--card-purple)" }}>Configuración de Perfil</h2>
      <input 
        style={{ width: "90%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "none" }}
        type="text" placeholder="Tu Nombre" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})}
      />
      <textarea 
        style={{ width: "90%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "none", height: "100px" }}
        placeholder="Tu biografía..." value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})}
      />
      <button className="btn-primary" style={{ background: "var(--card-purple)", width: "100%" }}>Guardar Cambios</button>
    </div>
  );
}

export default Profile;