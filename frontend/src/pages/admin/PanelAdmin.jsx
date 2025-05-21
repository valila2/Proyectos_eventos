import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../utils/auth';
import { useNavigate, NavLink, Outlet} from 'react-router-dom';
import "../../styles/admin.css"
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
  }, []);

  if (!usuario) return null; // Evita mostrar el contenido antes de validar

  return (
    <div className="admin-panel">
      <aside className="sidebar">
        <h3>Panel de Admin</h3>
        <p>{usuario.nombre}</p>
        <nav>
          <ul>
            <li>
              <NavLink to="eventos">Eventos</NavLink>
            </li>
            <li>
              <NavLink to="trabajadores">Trabajadores</NavLink>
            </li>
            <li>
              <NavLink to="asistentes">Asistentes</NavLink>
            </li>
            <li>
              <NavLink to="finanzas">Finanzas</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default PanelAdmin;
