// src/controllers/asistente.controller.js
import Asistente from "../models/Asistente.js";

// Crear un nuevo asistente
export const crearAsistente = async (req, res) => {
  const { nombre, telefono, evento, registradoPor, pagos } = req.body;

  if (!nombre || !telefono || !evento || !registradoPor) {
    return res.status(400).json({ mensaje: "Todos los campos son requeridos" });
  }

  if (!pagos || !Array.isArray(pagos) || pagos.length === 0) {
    return res
      .status(400)
      .json({ mensaje: "El registro requiere al menos un abono" });
  }

  if (pagos[0].valor < 100000) {
    return res
      .status(400)
      .json({ mensaje: "El abono inicial debe ser mínimo de 100.000" });
  }
  try {
    const nuevoAsistente = new Asistente({
      nombre,
      telefono,
      evento,
      registradoPor,
      pagos,
    });
    await nuevoAsistente.save();
    res.status(201).json(nuevoAsistente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el asistente", error });
  }
};

// Obtener todos los asistentes
export const obtenerAsistentes = async (req, res) => {
  try {
    const asistentes = await Asistente.find()
      .populate("evento")
      .populate("registradoPor", "nombre correo") // trae nombre y correo del trabajador que registró
      .populate("pagos.recibidoPor", "nombre correo"); // trae nombre y correo del trabajador que recibió cada pago

    res.json(asistentes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los asistentes", error });
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
    res.status(400).json({ mensaje: "Error al actualizar asistente", error });
  }
};

// Eliminar un asistente
export const eliminarAsistente = async (req, res) => {
  try {
    await Asistente.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Asistente eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar asistente", error });
  }
};

//registra pago asistente
export const registrarPago = async (req, res) => {
  try {
    const { idAsistente } = req.params;
    const { valor, recibidoPor } = req.body;

    const asistente = await Asistente.findById(idAsistente);
    if (!asistente)
      return res.status(404).json({ mensaje: "Asistente no encontrado" });

    asistente.pagos.push({ valor, recibidoPor });
    await asistente.save();

    res.json({ mensaje: "Pago registrado correctamente", asistente });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar el pago", error });
  }
};
