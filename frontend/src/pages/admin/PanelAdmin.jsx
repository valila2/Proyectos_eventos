import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../utils/auth';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaUserTie, FaMoneyBillWave, FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "../../styles/admin.css";

const PanelAdmin = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (!userInfo || userInfo.rol !== 'admin') {
      navigate('/login');
    } else {
      setUsuario(userInfo);
    }
  }, [navigate]);

  // Función para cerrar el offcanvas (menú móvil)
  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById('offcanvasSidebar');
    const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvas) offcanvas.hide();
  };

  if (!usuario) return null;

  return (
    <div className="d-flex" style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>

      {/* Botón hamburguesa móvil */}
      <div className="d-md-none bg-light p-2 shadow-sm">
        <button
          className="btn btn-outline-primary mobile-menu-btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar"
        >
          <FaBars size={20} /> Menú
        </button>
      </div>

      {/* Sidebar fijo para escritorio */}
      <aside
        className="bg-white border-end shadow-sm d-none d-md-flex flex-column p-4"
        style={{ width: '260px', height: '100vh', flexShrink: 0 }}
      >
        <h4 className="text-primary fw-bold mb-4">Panel Admin</h4>
        <div className="mb-4">
          <div className="fw-semibold">{usuario.nombre}</div>
          <div className="text-muted text-uppercase small">{usuario.rol}</div>
        </div>
        <nav className="nav flex-column gap-2">
          <NavLink to="eventos" className={({ isActive }) => 'nav-link ' + (isActive ? 'bg-primary text-white rounded' : 'text-dark')}>
            <FaCalendarAlt className="me-2" /> Eventos
          </NavLink>
          <NavLink to="trabajadores" className={({ isActive }) => 'nav-link ' + (isActive ? 'bg-primary text-white rounded' : 'text-dark')}>
            <FaUserTie className="me-2" /> Trabajadores
          </NavLink>
          <NavLink to="asistentes" className={({ isActive }) => 'nav-link ' + (isActive ? 'bg-primary text-white rounded' : 'text-dark')}>
            <FaUsers className="me-2" /> Asistentes
          </NavLink>
          <NavLink to="finanzas" className={({ isActive }) => 'nav-link ' + (isActive ? 'bg-primary text-white rounded' : 'text-dark')}>
            <FaMoneyBillWave className="me-2" /> Finanzas
          </NavLink>
        </nav>
      </aside>

      {/* Offcanvas para móvil */}
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
        style={{ width: '260px' }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-primary" id="offcanvasSidebarLabel">Panel Admin</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column p-3">
          <div className="mb-3 small">
            <strong>{usuario.nombre}</strong>
            <div className="text-muted text-uppercase">{usuario.rol}</div>
          </div>
          <nav className="nav flex-column gap-2">
            <NavLink to="eventos" onClick={closeOffcanvas} className={({ isActive }) => 'nav-link ' + (isActive ? 'bg-primary text-white rounded' : 'text-dark')}>
              <FaCalendarAlt className="me-2" /> Eventos
            </NavLink>
            <NavLink to="trabajadores" onClick={closeOffcanvas} className={({ isActive }) => 'nav-link ' + (isActive ? 'bg-primary text-white rounded' : 'text-dark')}>
              <FaUserTie className="me-2" /> Trabajadores
            </NavLink>
            <NavLink to="asistentes" onClick={closeOffcanvas} className={({ isActive }) => 'nav-link ' + (isActive ? 'bg-primary text-white rounded' : 'text-dark')}>
              <FaUsers className="me-2" /> Asistentes
            </NavLink>
            <NavLink to="finanzas" onClick={closeOffcanvas} className={({ isActive }) => 'nav-link ' + (isActive ? 'bg-primary text-white rounded' : 'text-dark')}>
              <FaMoneyBillWave className="me-2" /> Finanzas
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="flex-grow-1 p-4 bg-light" style={{ overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PanelAdmin;
