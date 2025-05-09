// src/controllers/asistente.controller.js
import Asistente from '../models/Asistente.js';

// Crear un nuevo asistente
export const crearAsistente = async (req, res) => {
  const { nombre, telefono, evento } = req.body;

  if (!nombre || !telefono || !evento) {
    return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
  }

  try {
    const nuevoAsistente = new Asistente({ nombre, telefono, evento });
    await nuevoAsistente.save();
    res.status(201).json(nuevoAsistente);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el asistente', error });
  }
};

// Obtener todos los asistentes
export const obtenerAsistentes = async (req, res) => {
  try {
    const asistentes = await Asistente.find().populate('evento');
    res.json(asistentes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los asistentes', error });
  }
};

// Actualizar un asistente
export const actualizarAsistente = async (req, res) => {
  try {
    const asistenteActualizado = await Asistente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(asistenteActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar asistente', error });
  }
};

// Eliminar un asistente
export const eliminarAsistente = async (req, res) => {
  try {
    await Asistente.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Asistente eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar asistente', error });
  }
};
