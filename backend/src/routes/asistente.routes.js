// src/routes/asistente.routes.js
import { Router } from 'express';
import {
  crearAsistente,
  obtenerAsistentes,
  actualizarAsistente,
  eliminarAsistente
} from '../controllers/asistente.controller.js';

const router = Router();

router.post('/asistente/', crearAsistente);
router.get('/asistente/', obtenerAsistentes);
router.put('/asistente/:id', actualizarAsistente);
router.delete('/asistente/:id', eliminarAsistente);

export default router;
