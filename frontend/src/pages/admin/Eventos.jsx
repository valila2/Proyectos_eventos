import React, { useEffect, useState } from 'react';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: '',
    fecha: '',
    lugar: '',
    descripcion: '',
    valor: ''
  });
  const [editing, setEditing] = useState(false);

  // Función para cargar eventos desde backend (simularemos fetch)
  const cargarEventos = async () => {
    // Aquí simulo llamada fetch a backend
    // Reemplaza con fetch('tu-api/eventos') y manejo real
    const data = [
      { id: 1, nombre: 'Evento 1', fecha: '2024-06-20', lugar: 'Sala A', descripcion: 'Descripción 1', valor: 100000 },
      { id: 2, nombre: 'Evento 2', fecha: '2024-07-10', lugar: 'Sala B', descripcion: 'Descripción 2', valor: 150000 },
    ];
    setEventos(data);
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editing) {
      // Editar evento: llamar a API de edición
      // Actualizar en backend y refrescar lista
      alert('Funcionalidad de editar en backend');
    } else {
      // Crear evento: llamar a API de creación
      alert('Funcionalidad de crear en backend');
    }
    // Por ahora solo limpiar formulario y refrescar lista simulada
    setForm({ id: null, nombre: '', fecha: '', lugar: '', descripcion: '', valor: '' });
    setEditing(false);
    cargarEventos();
  };

  const handleEdit = evento => {
    setForm(evento);
    setEditing(true);
  };

  const handleDelete = id => {
    // Aquí llamas a la API para eliminar y luego refrescas
    alert(`Eliminar evento con id ${id} - funcionalidad backend`);
    cargarEventos();
  };

  return (
    <div>
      <h2>Gestión de Eventos</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input name="nombre" type="text" className="form-control" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input name="fecha" type="date" className="form-control" value={form.fecha} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Lugar</label>
          <input name="lugar" type="text" className="form-control" value={form.lugar} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea name="descripcion" className="form-control" value={form.descripcion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Valor</label>
          <input name="valor" type="number" className="form-control" value={form.valor} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">{editing ? 'Actualizar' : 'Crear'}</button>
        {editing && (
          <button type="button" className="btn btn-secondary ms-2" onClick={() => {
            setForm({ id: null, nombre: '', fecha: '', lugar: '', descripcion: '', valor: '' });
            setEditing(false);
          }}>Cancelar</button>
        )}
      </form>

      <hr />

      <h3>Eventos existentes</h3>
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
            {eventos.map(ev => (
              <tr key={ev.id}>
                <td>{ev.nombre}</td>
                <td>{ev.fecha}</td>
                <td>{ev.lugar}</td>
                <td>{ev.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(ev)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(ev.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Eventos;
