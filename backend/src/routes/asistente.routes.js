// src/routes/asistente.routes.js
import { Router } from 'express';
import {
  crearAsistente,
  obtenerAsistentes,
  actualizarAsistente,
  eliminarAsistente,
  registrarPago
} from '../controllers/asistente.controller.js';

const router = Router();

router.post('/asistente/', crearAsistente);
router.get('/asistente/', obtenerAsistentes);
router.put('/asistente/:id', actualizarAsistente);
router.delete('/asistente/:id', eliminarAsistente);
router.post('/asistente/:idAsistente/pagos', registrarPago);

export default router;
