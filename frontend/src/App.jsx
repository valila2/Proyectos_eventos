import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/Login";
import PanelAdmin from "./pages/admin/PanelAdmin";
import Eventos from "./pages/admin/Eventos";
import Trabajadores from "./pages/admin/Trabajadores";
import Asistentes from "./pages/admin/Asistentes";
import Finanzas from "./pages/admin/Finanzas";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PanelAdmin />}>
          <Route path="eventos" element={<Eventos />} />
          <Route path="trabajadores" element={<Trabajadores />} />
          <Route path="asistentes" element={<Asistentes />} />
          <Route path="finanzas" element={<Finanzas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
