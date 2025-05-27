import React, { useEffect, useState } from 'react';
import ModalEvento from '../../components/EventoModal';
import * as bootstrap from 'bootstrap';

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

  const cargarEventos = async () => {
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
      alert('Funcionalidad de editar en backend');
    } else {
      alert('Funcionalidad de crear en backend');
    }
    setForm({ id: null, nombre: '', fecha: '', lugar: '', descripcion: '', valor: '' });
    setEditing(false);
    cargarEventos();
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEvento'));
    modal.hide();
  };

  const handleEdit = evento => {
    setForm(evento);
    setEditing(true);
    const modal = new bootstrap.Modal(document.getElementById('modalEvento'));
    modal.show();
  };

  const handleDelete = id => {
    alert(`Eliminar evento con id ${id} - funcionalidad backend`);
    cargarEventos();
  };

  return (
    <div className="container mt-4">
      <h2>Eventos Registrados</h2>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target="#modalEvento"
        onClick={() => {
          setForm({ id: null, nombre: '', fecha: '', lugar: '', descripcion: '', valor: '' });
          setEditing(false);
        }}
      >
        Nuevo Evento
      </button>

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

      <ModalEvento
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editing={editing}
        setEditing={setEditing}
        setForm={setForm}
      />
    </div>
  );
};

export default Eventos;
