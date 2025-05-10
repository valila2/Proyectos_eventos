import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usuarioRuta from "./routes/usuario.routes.js";
import eventoRuta from "./routes/evento.routes.js";
import asistenteRuta from './routes/asistente.routes.js';
import trabajadorRuta from './routes/trabajador.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use("/api", usuarioRuta)
app.use("/api", eventoRuta)
app.use("/api", asistenteRuta)
app.use("/api", trabajadorRuta)
export default app;