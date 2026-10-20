// src/components/TablaModulo.jsx
// Componente genérico para mostrar una tabla con CRUD (crear, leer, actualizar, eliminar)
"use client"
import { useState, useEffect } from "react"
import styles from "./TablaModulo.module.css"


export default function TablaModulo({ titulo, endpoint, columnas, campos }) {
  const [datos, setDatos] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState(null)  // null = crear, objeto = editar
  const [form, setForm] = useState({})
  const [pagina, setPagina] = useState(1)
  const POR_PAGINA = 10
  const apiurl = "http://localhost:8080";
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(localStorage.getItem('jwt'));
  }, [])

  // Cargar datos del endpoint
  useEffect(() => {
    if (!token) return

    fetch(`${apiurl}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(async r => {
        const text = await r.text()
        console.log(`Respuesta de ${apiurl}/${endpoint}:`, text);
        if (!r.ok) {
          console.error(`Error ${r.status}:`, text)
          throw new Error(`Error ${r.status}`)
        }
        return text ? JSON.parse(text) : null
      })
      .then(data => {
        // Normaliza distintos formatos de respuesta del backend:
        // - Array plano: [ {...}, {...} ]
        // - Página de Spring Data: { content: [...], totalPages, ... }
        if (Array.isArray(data)) return data
        if (data && Array.isArray(data.content)) return data.content
        return []
      })
      .then(setDatos)
      .catch(err => console.error('Error al cargar datos:', err))
  }, [endpoint, token])

  // Filtrar por búsqueda (protegido por si datos aún no es un array)
  const filtrados = Array.isArray(datos)
    ? datos.filter(item =>
      columnas.some(col =>
        String(item[col.key] ?? "").toLowerCase().includes(busqueda.toLowerCase())
      )
    )
    : []

  // Paginación
  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA)
  const paginados = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  // Abrir modal para crear
  function abrirCrear() {
    const vacio = campos.reduce((acc, c) => {
      if (c.type === "select" && c.options?.length > 0) {
        const primera = c.options[0]
        const valorInicial = typeof primera === "object" ? primera.value : primera
        return { ...acc, [c.key]: valorInicial }
      }
      return { ...acc, [c.key]: "" }
    }, {})
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


    //console.log("token: " + String(token));
    const metodo = editando ? "PUT" : "POST"

    const url = editando
      ? `http://localhost:8080/${endpoint}/${editando.id}`
      : `http://localhost:8080/${endpoint}/save`

    console.log("URL:" + url);
    console.log(JSON.stringify(form));
    const res = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify(form),
    });

    if (res.ok) {

    } else {
      console.log(`Error ${res.status} token: ${token}`);
    }

    // El backend no devuelve el objeto, así que recargamos la lista
    const recargados = await fetch(`${apiurl}/${endpoint}`, {

      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(r => r.json())

    setDatos(Array.isArray(recargados) ? recargados : (recargados?.content ?? []))
    setModalOpen(false)

    // Recargar datos


  }


  async function guardaxr() {
    // ajusta la key según como lo guardes
    const url = `http://localhost:8080/${endpoint}/save`

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    await fetch(`${apiurl}/${endpoint}/${id}`, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${token}` }
    })
    setDatos(datos.filter(d => d.id !== id))
  }

  return (
    <div className={styles.wrapper}>

      {/* Encabezado */}
      <div className={styles.header}>
        {/**}<div>
          <h2 className={styles.titulo}>{titulo}</h2>
          <p className={styles.subtitulo}>{filtrados.length} registros</p>
        </div>{**/}
        <input
          className={styles.buscador}
          placeholder={`Buscar en ${titulo.toLowerCase()}...`}
          value={busqueda}
          onChange={e => { setBusqueda(e.target.value); setPagina(1) }}
        />
        <button className={styles.btnAgregar} onClick={abrirCrear}>
          + Agregar {titulo.slice(0, -1)}
        </button>
      </div>

      {/* Buscador */}


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
                      <span style={{ '--color-boolean': item[col.key] ? '#16a34a' : '#dc2626' }}>
                        {item[col.key] ? '● Disponible' : '● Ocupada'}
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
                      value={String(form[campo.key] ?? "")}
                      onChange={e => {
                        const opcion = campo.options.find(
                          op => String(typeof op === "object" ? op.value : op) === e.target.value
                        )
                        const valorReal = typeof opcion === "object" ? opcion.value : opcion
                        setForm({ ...form, [campo.key]: valorReal })
                      }}
                    >
                      {campo.options.map(op => {
                        const valor = typeof op === "object" ? op.value : op
                        const etiqueta = typeof op === "object" ? op.label : op
                        return (
                          <option key={String(valor)} value={String(valor)}>
                            {etiqueta}
                          </option>
                        )
                      })}
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
              <button onClick={editar} className={styles.btnGuardar}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}