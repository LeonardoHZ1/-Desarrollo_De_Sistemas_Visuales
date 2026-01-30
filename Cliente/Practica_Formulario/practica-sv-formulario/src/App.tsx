import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Registro = {
  nombre: string
  correo: string
  tipo: string
  fecha: string
}

export default function App() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [tipo, setTipo] = useState('Presencial')
  const [acepta, setAcepta] = useState(false)

  const [progreso, setProgreso] = useState(0)
  const [guardando, setGuardando] = useState(false)
  const [registros, setRegistros] = useState<Registro[]>([])

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)

  const formularioValido = useMemo(() => {
    return nombre.trim().length >= 3 && correoValido && acepta
  }, [nombre, correoValido, acepta])

  // Cargar registros
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('eventos') || '[]')
    setRegistros(data)
  }, [])

  // Barra de progreso
  useEffect(() => {
    if (!guardando) return

    const id = setInterval(() => {
      setProgreso(p => {
        if (p >= 100) {
          clearInterval(id)
          guardarRegistro()
          return 100
        }
        return p + 10
      })
    }, 300)

    return () => clearInterval(id)
  }, [guardando])

  const guardarRegistro = () => {
    const nuevo = {
      nombre,
      correo,
      tipo,
      fecha: new Date().toLocaleString()
    }

    const nuevosRegistros = [...registros, nuevo]
    localStorage.setItem('eventos', JSON.stringify(nuevosRegistros))
    setRegistros(nuevosRegistros)

    limpiar()
    setGuardando(false)
  }

  const limpiar = () => {
    setNombre('')
    setCorreo('')
    setTipo('Presencial')
    setAcepta(false)
    setProgreso(0)
  }

  const eliminarRegistros = () => {
    if (!confirm('¿Eliminar todos los registros?')) return
    localStorage.removeItem('eventos')
    setRegistros([])
  }

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formularioValido) return
    setProgreso(0)
    setGuardando(true)
  }

  return (
    <div className="app">
      <div className="layout">

        {/* SVG DESDE PUBLIC */}
        <img src="/event.svg" alt="Evento" className="svg" />

        <div className="card">
          <h2>Registro a Evento</h2>

          <form onSubmit={enviar}>
            <label>
              Nombre
              <input
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </label>

            <label>
              Correo
              <input
                value={correo}
                onChange={e => setCorreo(e.target.value)}
              />
            </label>

            <label>
              Tipo
              <select value={tipo} onChange={e => setTipo(e.target.value)}>
                <option>Presencial</option>
                <option>Virtual</option>
              </select>
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={acepta}
                onChange={e => setAcepta(e.target.checked)}
              />
              Acepto términos
            </label>

            <button disabled={!formularioValido || guardando}>
              {guardando ? 'Guardando…' : 'Registrar'}
            </button>
          </form>

          {guardando && (
            <div className="progress-container">
              <div className="progress" style={{ width: `${progreso}%` }}>
                {progreso}%
              </div>
            </div>
          )}

          <h3>Registros</h3>

          {registros.length === 0 && <p>No hay registros</p>}

          <ul>
            {registros.map((r, i) => (
              <li key={i}>
                <strong>{r.nombre}</strong> – {r.tipo}<br />
                <small>{r.fecha}</small>
              </li>
            ))}
          </ul>

          <button
            className="danger"
            onClick={eliminarRegistros}
            disabled={registros.length === 0}
          >
            Eliminar registros
          </button>
        </div>
      </div>
    </div>
  )
}
