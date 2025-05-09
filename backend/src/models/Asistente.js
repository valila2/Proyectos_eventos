// models/Asistente.js
import { Schema, model } from 'mongoose';

const asistenteSchema = new Schema({
  nombre:   { type: String, required: true },
  telefono: { type: String, required: true },
  evento:   { type: Schema.Types.ObjectId, ref: 'Evento', required: true }
}, {
  timestamps: true
});

export default model('Asistente', asistenteSchema);
