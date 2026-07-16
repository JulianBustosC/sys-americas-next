// src/components/TablaModulo.jsx
"use client"
import { useState, useEffect } from "react"
import styles from "./TablaModulo.module.css"
const apiurl = "http://localhost:8080";

export default function TablaModulo({ titulo, endpoint, columnas, campos }) {
  const [datos, setDatos] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState(null)  // null = crear, objeto = editar
  const [form, setForm] = useState({})
  const [pagina, setPagina] = useState(1)
  const POR_PAGINA = 10
  const token = localStorage.getItem('jwt') 
    // Cargar datos del endpoint
    useEffect(() => {
   

      fetch(`${apiurl}/${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(async r => {
          const text = await r.text()
          if (!r.ok) {
            console.error(`Error ${r.status}:`, text)
            throw new Error(`Error ${r.status}`)
          }
          return text ? JSON.parse(text) : null
        })
        .then(setDatos)
        .catch(err => console.error('Error al cargar datos:', err))
    }, [endpoint])

  // Filtrar por búsqueda
  const filtrados = datos.filter(item =>
    columnas.some(col =>
      String(item[col.key] ?? "").toLowerCase().includes(busqueda.toLowerCase())
    )
  )

  // Paginación
  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA)
  const paginados = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  // Abrir modal para crear
  function abrirCrear() {
    const vacio = campos.reduce((acc, c) => ({ ...acc, [c.key]: "" }), {})
    setForm(vacio)
    setEditando(null)
    setModalOpen(true)
  }

  // Abrir modal para editar
  function abrirEditar(item) {
    setForm({ ...item })
    setEditando(item)
    setModalOpen(true)
  }


  // Guardar (crear o editar)
  async function editar() {
    const method = editando ? "PUT" : "POST"
      ? `$http://localhost:8080/${endpoint}/${editando.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(form),
    })

    // Recargar datos
    fetch(`${apiurl}/${endpoint}`)
      .then(r => r.json())
      .then(setDatos)

    setModalOpen(false)
  }


  async function guardar() {
    // ajusta la key según como lo guardes
    const url = `http://localhost:8080/${endpoint}/save`

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })

    if (res.status === 401 || res.status === 403) {
      console.error("No autorizado, token inválido o expirado")
      // aquí podrías redirigir a login
      return
    }

    if (!res.ok) {
      console.error("Error guardando:", await res.text() ? await res.text() : "Error desconocido")
      return
    }

    const data = await res.json()
    return data
  }
  // Eliminar
  async function eliminar(id) {
    if (!confirm("¿Eliminar este registro?")) return
    await fetch(`/${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`, { method: "DELETE" })
    setDatos(datos.filter(d => d.id !== id))
  }

  return (
    <div className={styles.wrapper}>

      {/* Encabezado */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.titulo}>{titulo}</h2>
          <p className={styles.subtitulo}>{filtrados.length} registros</p>
        </div>
        <button className={styles.btnAgregar} onClick={abrirCrear}>
          + Agregar {titulo.slice(0, -1)}
        </button>
      </div>

      {/* Buscador */}
      <input
        className={styles.buscador}
        placeholder={`Buscar en ${titulo.toLowerCase()}...`}
        value={busqueda}
        onChange={e => { setBusqueda(e.target.value); setPagina(1) }}
      />

      {/* Tabla */}
      <div className={styles.tablaWrapper}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              {columnas.map(col => (

                <th key={col.key}>{col.label}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginados.map((item, i) => (
              <tr key={item.id ?? i}>
                {columnas.map(col => (
                  <td key={col.key}>
                    {typeof item[col.key] === 'boolean' ? (
                      <span style={{ color: item[col.key] ? '#16a34a' : '#dc2626' }}>
                        {item[col.key] ? '● Sí' : '● No'}
                      </span>
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
                <td className={styles.acciones}>
                  <button onClick={() => abrirEditar(item)}>Editar</button>
                  <button onClick={() => eliminar(item.id)} className={styles.btnEliminar}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className={styles.paginacion}>
        <span>Página {pagina} de {totalPaginas}</span>
        <div>
          <button onClick={() => setPagina(p => Math.max(1, p - 1))} disabled={pagina === 1}>Anterior</button>
          <button onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas}>Siguiente</button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className={styles.overlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{editando ? "Editar" : "Agregar"} {titulo.slice(0, -1)}</h3>
              <button onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              {campos.map(campo => (
                <div key={campo.key} className={styles.campo}>
                  <label>{campo.label}</label>
                  {campo.type === "select" ? (
                    <select
                      value={form[campo.key] ?? ""}
                      onChange={e => setForm({ ...form, [campo.key]: e.target.value })}
                    >
                      {campo.options.map(op => (
                        <option key={op} value={op}>{op}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={campo.type ?? "text"}
                      placeholder={campo.placeholder ?? ""}
                      value={form[campo.key] ?? ""}
                      onChange={e => setForm({ ...form, [campo.key]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
              <button onClick={guardar} className={styles.btnGuardar}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}