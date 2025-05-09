// routes/evento.routes.js

import { Router } from 'express';
import {
  crearEvento,
  obtenerEventos,
  obtenerEventoPorId,
  actualizarEvento,
  eliminarEvento
} from '../controllers/evento.controller.js';

const router = Router();

router.post('/eventos/', crearEvento);
router.get('/eventos/', obtenerEventos);
router.get('/eventos/:id', obtenerEventoPorId);
router.put('/eventos/:id', actualizarEvento);
router.delete('/eventos/:id', eliminarEvento);

export default router;
