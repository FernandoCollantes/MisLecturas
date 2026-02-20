const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
// Aseguramos que cargue el .env buscando la ruta absoluta
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Rutas
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// MIDDLEWARES
// CORS: Ahora que sabemos que usas el puerto 8080, esto le da permiso total
app.use(cors()); 

// Parser y Logger
app.use(express.json());
app.use(morgan('dev'));

// RUTAS
// Importante: El frontend debe llamar a /api/auth/register
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Health Check: Útil para probar si el servidor responde sin base de datos
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Manejador de errores global (Para evitar que el servidor se caiga y de un 500 genérico)
app.use((err, req, res, next) => {
    console.error("💥 Error no controlado:", err.stack);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

module.exports = app;