// routes/evento.routes.js

import { Router } from 'express';
import {
  crearEvento,
  obtenerEventos,
  obtenerEventoPorId,
  actualizarEvento,
  eliminarEvento
} from '../controllers/evento.controller.js';
import { verificarToken } from '../middlewares/auth.js'; 
const router = Router();

router.post('/eventos/', verificarToken, crearEvento);
router.get('/eventos/', verificarToken, obtenerEventos);
router.get('/eventos/:id', obtenerEventoPorId);
router.put('/eventos/:id', actualizarEvento);
router.delete('/eventos/:id', eliminarEvento);

export default router;
