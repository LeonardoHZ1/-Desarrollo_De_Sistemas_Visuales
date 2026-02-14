import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Importamos tu contexto

function Profile() {
  const { user: authUser, logout } = useAuth(); // Obtenemos el usuario real y el logout
  const [isEditing, setIsEditing] = useState(false);
  const [animate, setAnimate] = useState(false);
  
  // Inicializamos con los datos del AuthContext o valores por defecto
  const [user, setUser] = useState({
    username: authUser?.username || "Usuario",
    email: authUser?.email || "correo@ejemplo.com",
    role: authUser?.role || "user",
    bio: "¡Hola! Soy un apasionado de la música. 🎧"
  });

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      logout(); // Usamos la función de tu AuthContext
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("✅ Perfil actualizado localmente");
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: '#000000', // CAMBIO: Fondo negro puro
      fontFamily: 'sans-serif',
      opacity: animate ? 1 : 0,
      transform: animate ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      background: '#121214',
      borderRadius: '30px',
      border: '1px solid #333',
      boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
      overflow: 'hidden',
      color: 'white'
    },
    banner: {
      height: '140px',
      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    avatarCircle: {
      width: '90px',
      height: '90px',
      background: '#111',
      borderRadius: '50%',
      border: '4px solid #121214',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '60px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.5)'
    },
    content: { padding: '60px 35px 40px 35px', textAlign: 'center' },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '12px',
      background: '#1a1a1c',
      border: '1px solid #333',
      borderRadius: '12px',
      color: 'white'
    },
    btnEdit: {
      background: 'white',
      color: 'black',
      border: 'none',
      padding: '14px',
      borderRadius: '16px',
      fontWeight: 'bold',
      width: '100%',
      cursor: 'pointer',
      marginTop: '10px'
    },
    btnLogout: {
      background: 'transparent',
      border: 'none',
      color: '#555',
      fontSize: '11px',
      marginTop: '30px',
      cursor: 'pointer',
      fontWeight: 'bold',
      letterSpacing: '1.5px',
      textTransform: 'uppercase'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.banner}>
           <div style={styles.avatarCircle}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
           </div>
        </div>

        <div style={styles.content}>
          {!isEditing ? (
            <>
              <h2 style={{ fontSize: '28px', margin: '0', fontWeight: '800' }}>{user.username}</h2>
              <div style={{ marginTop: '5px' }}>
                <span style={{ color: '#a855f7', fontSize: '10px', fontWeight: '900', letterSpacing: '2px', background: 'rgba(168, 85, 247, 0.1)', padding: '3px 10px', borderRadius: '10px' }}>
                  {user.role.toUpperCase()}
                </span>
              </div>
              
              <p style={{ color: '#666', fontSize: '14px', margin: '15px 0' }}>{user.email}</p>
              
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', margin: '25px 0', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ color: '#bbb', fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6', margin: 0 }}>"{user.bio}"</p>
              </div>

              <button style={styles.btnEdit} onClick={() => setIsEditing(true)}>EDITAR PERFIL</button>
            </>
          ) : (
            <form onSubmit={handleSave}>
              <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Configuración de Perfil</h3>
              <input 
                style={styles.input} 
                value={user.username} 
                onChange={(e) => setUser({...user, username: e.target.value})} 
                placeholder="Nombre de usuario"
                required
              />
              <textarea 
                style={{...styles.input, height: '100px', resize: 'none'}} 
                value={user.bio} 
                onChange={(e) => setUser({...user, bio: e.target.value})}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{...styles.btnEdit, background: '#a855f7', color: 'white'}}>GUARDAR</button>
                <button type="button" style={{...styles.btnEdit, background: '#222', color: '#888'}} onClick={() => setIsEditing(false)}>CANCELAR</button>
              </div>
            </form>
          )}

          <button style={styles.btnLogout} onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;