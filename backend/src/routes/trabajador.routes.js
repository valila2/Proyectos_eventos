import { Router } from 'express';
import {
  obtenerTrabajadores,
  obtenerTrabajadorPorId
} from '../controllers/trabajador.controller.js';

const router = Router();

router.get('/trabajadores/', obtenerTrabajadores);
router.get('/trabajadores/:id', obtenerTrabajadorPorId);

export default router;
