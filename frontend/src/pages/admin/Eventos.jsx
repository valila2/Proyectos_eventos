import React, { useEffect, useState } from "react";
import ModalEvento from "../../components/EventoModal";
import * as bootstrap from "bootstrap";
import {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} from "../../services/eventosServices";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [eventosPorPagina, setEventosPorPagina] = useState(10);
  const [totalEventos, setTotalEventos] = useState(0);
  const [fechaFiltro, setFechaFiltro] = useState("");

  const [form, setForm] = useState({
    id: null,
    nombre: "",
    fecha: "",
    lugar: "",
    descripcion: "",
    valor: "",
  });
  const [editing, setEditing] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const cargarEventos = async (pagina = 1) => {
    try {
      const data = await obtenerEventos(pagina, eventosPorPagina, fechaFiltro);
      const eventosFormateados = data.eventos.map((ev) => ({
        ...ev,
        id: ev._id,
      }));
      setEventos(eventosFormateados);
      setTotalPaginas(data.totalPages);
      setTotalEventos(data.totalEventos); // Asegúrate de que el backend lo devuelva
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  useEffect(() => {
    cargarEventos(paginaActual);
  }, [eventosPorPagina, paginaActual, fechaFiltro]);

  const handleCambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await actualizarEvento(form.id, form);
      } else {
        await crearEvento(form);
      }

      setForm({
        id: null,
        nombre: "",
        fecha: "",
        lugar: "",
        descripcion: "",
        valor: "",
      });
      setEditing(false);
      cargarEventos();
      console.log("form:", form);
      const modalElement = document.getElementById("modalEvento");
      const modal =
        bootstrap.Modal.getInstance(modalElement) ||
        new bootstrap.Modal(modalElement);
      modal.hide();

      setTimeout(() => {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) backdrop.remove();
        document.body.classList.remove("modal-open");
        document.body.style = "";
      }, 300);
    } catch (error) {
      console.error("Error al guardar el evento:", error);
    }
  };

  const handleEdit = (evento) => {
    const fechaFormateada = new Date(evento.fecha).toISOString().split("T")[0];
    setForm({ ...evento, fecha: fechaFormateada });
    setEditing(true);
    const modal = new bootstrap.Modal(document.getElementById("modalEvento"));
    modal.show();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este evento?")) return;

    try {
      await eliminarEvento(id);
      cargarEventos();
    } catch (error) {
      console.error("Error al eliminar evento:", error);
    }
  };

  const handleView = (evento) => {
    setEventoSeleccionado(evento);
    const modal = new bootstrap.Modal(
      document.getElementById("modalVerEvento")
    );
    modal.show();
  };

  return (
    <div className="container mt-4">
      <h2>LISTA DE EVENTOS</h2>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <label className="form-label">Filtrar por fecha:</label>
          <input
            type="date"
            className="form-control"
            value={fechaFiltro}
            onChange={(e) => {
              setFechaFiltro(e.target.value);
              setPaginaActual(1);
            }}
          />
        </div>
        <div className="col-md-6 d-flex align-items-end justify-content-end">
          <div>
            <label className="form-label me-2">Mostrar:</label>
            <select
              className="form-select w-auto"
              value={eventosPorPagina}
              onChange={(e) => {
                setEventosPorPagina(Number(e.target.value));
                setPaginaActual(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
      <div className=" d-flex align-items-end justify-content-end">
        <button
          className="btn btn-success mb-3"
          data-bs-toggle="modal"
          data-bs-target="#modalEvento"
          onClick={() => {
            setForm({
              id: null,
              nombre: "",
              fecha: "",
              lugar: "",
              descripcion: "",
              valor: "",
            });
            setEditing(false);
          }}
        >
          Crear Evento
        </button>
      </div>

      {eventos.length === 0 ? (
        <p>No hay eventos registrados.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Lugar</th>
              <th>Valor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((ev) => (
              <tr key={ev.id}>
                <td>{ev.nombre}</td>
                <td>
                  {new Date(ev.fecha).toLocaleDateString("es-CO", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>{ev.lugar}</td>
                <td>
                  {ev.valor.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleView(ev)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(ev)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(ev.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal para Crear/Editar */}
      <ModalEvento
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editing={editing}
        setEditing={setEditing}
        setForm={setForm}
      />

      {/* Modal para Ver Detalle */}
      <div
        className="modal fade"
        id="modalVerEvento"
        tabIndex="-1"
        aria-labelledby="modalVerEventoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {eventoSeleccionado && (
              <>
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title" id="modalVerEventoLabel">
                    Detalle del Evento
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <strong>Nombre:</strong>
                      <p>{eventoSeleccionado.nombre}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <strong>Fecha:</strong>
                      <p>
                        {new Date(eventoSeleccionado.fecha).toLocaleDateString(
                          "es-CO"
                        )}
                      </p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <strong>Lugar:</strong>
                      <p>{eventoSeleccionado.lugar}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <strong>Valor:</strong>
                      <p>
                        {eventoSeleccionado.valor.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                        })}
                      </p>
                    </div>
                    <div className="col-12 mb-3">
                      <strong>Descripción:</strong>
                      <p>{eventoSeleccionado.descripcion}</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <nav>
            <ul className="pagination mb-0">
              <li
                className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}
              >
                <button className="page-link" onClick={() => cargarEventos(1)}>
                  Inicio
                </button>
              </li>

              <li
                className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handleCambiarPagina(paginaActual - 1)}
                >
                  Anterior
                </button>
              </li>

              {paginaActual > 1 && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handleCambiarPagina(paginaActual - 1)}
                  >
                    {paginaActual - 1}
                  </button>
                </li>
              )}

              <li className="page-item active">
                <span className="page-link">{paginaActual}</span>
              </li>

              {paginaActual < totalPaginas && (
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handleCambiarPagina(paginaActual + 1)}
                  >
                    {paginaActual + 1}
                  </button>
                </li>
              )}

              <li
                className={`page-item ${
                  paginaActual === totalPaginas ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handleCambiarPagina(paginaActual + 1)}
                >
                  Siguiente
                </button>
              </li>

              <li
                className={`page-item ${
                  paginaActual === totalPaginas ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => cargarEventos(totalPaginas)}
                >
                  Fin
                </button>
              </li>
            </ul>
          </nav>

          <p className="mb-0 text-muted">
            Página {paginaActual} de {totalPaginas} ({totalEventos} eventos en
            total)
          </p>
        </div>
      )}
    </div>
  );
};

export default Eventos;
