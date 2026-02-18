const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Rutas
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// MIDDLEWARES
// 1. CORS: Lo dejamos abierto (*) para evitar bloqueos en desarrollo
app.use(cors()); 

// 2. Parser y Logger
app.use(express.json());
app.use(morgan('dev'));

// RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

module.exports = app;