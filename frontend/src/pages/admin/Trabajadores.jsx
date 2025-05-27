import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Trabajadores() {
  const [trabajadores, setTrabajadores] = useState([]);
  const [nuevoTrabajador, setNuevoTrabajador] = useState({
    nombre: '',
    rol: '',
    contacto: '',
    correo: '',
    contraseña: ''
  });

  // Cargar trabajadores desde el backend
  useEffect(() => {
    axios.get('http://localhost:4000/api/trabajadores')
      .then(res => setTrabajadores(res.data))
      .catch(err => console.error('Error al cargar trabajadores:', err));
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoTrabajador({ ...nuevoTrabajador, [name]: value });
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/trabajadores', nuevoTrabajador);
      setTrabajadores([...trabajadores, res.data]);
      setNuevoTrabajador({
        nombre: '',
        rol: '',
        contacto: '',
        correo: '',
        contraseña: ''
      });
    } catch (error) {
      console.error('Error al registrar trabajador:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Gestión de Trabajadores</h2>

      <form onSubmit={manejarRegistro} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input type="text" className="form-control" name="nombre" placeholder="Nombre" value={nuevoTrabajador.nombre} onChange={manejarCambio} required />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" name="rol" placeholder="Rol" value={nuevoTrabajador.rol} onChange={manejarCambio} required />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" name="contacto" placeholder="Contacto" value={nuevoTrabajador.contacto} onChange={manejarCambio} />
          </div>
          <div className="col-md-4">
            <input type="email" className="form-control" name="correo" placeholder="Correo" value={nuevoTrabajador.correo} onChange={manejarCambio} />
          </div>
          <div className="col-md-3">
            <input type="password" className="form-control" name="contraseña" placeholder="Contraseña" value={nuevoTrabajador.contraseña} onChange={manejarCambio} />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">Registrar</button>
          </div>
        </div>
      </form>

      <h4>Lista de Trabajadores</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Contacto</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.map((t, index) => (
            <tr key={index}>
              <td>{t.nombre}</td>
              <td>{t.rol}</td>
              <td>{t.contacto}</td>
              <td>{t.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Trabajadores;
