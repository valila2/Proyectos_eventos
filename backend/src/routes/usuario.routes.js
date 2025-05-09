// routes/usuario.routes.js
import { Router } from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/usuario.controller.js';


const router = Router();

// Rutas para usuarios
router.post('/usuarios/', crearUsuario);             // Crear usuario
router.get('/usuarios/', obtenerUsuarios);           // Obtener todos
router.put('/usuarios/:id', actualizarUsuario);      // Actualizar usuario
router.delete('/usuarios/:id', eliminarUsuario);     // Eliminar usuario

export default router;
