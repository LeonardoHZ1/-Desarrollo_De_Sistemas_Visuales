import { useState } from 'react'
import './App.css'
import evento from './assets/evento.svg'

export default function App() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [tipo, setTipo] = useState('Presencial')
  const [acepta, setAcepta] = useState(false)
  const [error, setError] = useState('')
  const [progreso, setProgreso] = useState(0)
  const [guardando, setGuardando] = useState(false)

  const correoValido = /\S+@\S+\.\S+/.test(correo)

  const registrar = () => {
    if (!nombre || !correoValido || !acepta) {
      setError('Colocar nombre, correo válido y aceptar términos')
      return
    }

    setError('')
    setGuardando(true)
    setProgreso(0)

    let valor = 0
    const intervalo = setInterval(() => {
      valor += 10
      setProgreso(valor)

      if (valor >= 100) {
        clearInterval(intervalo)
        guardarLocal()
        setGuardando(false)
      }
    }, 300)
  }

  const guardarLocal = () => {
    const registros = JSON.parse(localStorage.getItem('registros') || '[]')
    registros.push({ nombre, correo, tipo })
    localStorage.setItem('registros', JSON.stringify(registros))
  }

  return (
    <div className="page">
      <div className="layout">
        <img src={evento} alt="Evento" className="imagen" />

        <div className="card">
          <h2>Registro a Evento</h2>

          <label>Nombre:</label>
          <input
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Nombre completo"
          />

          <label>Correo:</label>
          <input
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            placeholder="correo@ejemplo.com"
          />

          <label>Tipo de evento:</label>
          <select value={tipo} onChange={e => setTipo(e.target.value)}>
            <option>Presencial</option>
            <option>Virtual</option>
          </select>

          <label className="check">
            <input
              type="checkbox"
              checked={acepta}
              onChange={e => setAcepta(e.target.checked)}
            />
            Acepto términos y condiciones
          </label>

          <button onClick={registrar} disabled={guardando}>
            Registrar
          </button>

          {guardando && (
            <div className="barra">
              <div className="relleno" style={{ width: `${progreso}%` }}>
                {progreso}%
              </div>
            </div>
          )}

          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  )
}
