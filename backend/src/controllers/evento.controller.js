// controllers/evento.controller.js

import Evento from '../models/Evento.js';

// Crear un nuevo evento
export const crearEvento = async (req, res) => {
  try {
    const nuevoEvento = new Evento(req.body);
    await nuevoEvento.save();
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el evento', error });
  }
};

// Obtener todos los eventos
export const obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().populate('trabajadores', 'nombre correo');
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener eventos', error });
  }
};

// Obtener un evento por ID
export const obtenerEventoPorId = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).populate('trabajadores', 'nombre correo');
    if (!evento) return res.status(404).json({ mensaje: 'Evento no encontrado' });
    res.json(evento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el evento', error });
  }
};

// Actualizar un evento
export const actualizarEvento = async (req, res) => {
  try {
    const eventoActualizado = await Evento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(eventoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el evento', error });
  }
};

// Eliminar un evento
export const eliminarEvento = async (req, res) => {
  try {
    await Evento.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el evento', error });
  }
};
