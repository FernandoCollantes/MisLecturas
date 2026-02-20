const mysql = require('mysql2/promise');
const path = require('path');
// Esto asegura que cargue el .env aunque lances el proceso desde carpetas distintas
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // Aquí usará 'MisLecturas' (con mayúsculas) del .env
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Esto ayuda a que las fechas y carácteres especiales no den errores
  timezone: 'Z'
});

// Test de conexión mejorado con logs claros
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ DATABASE CONNECTED: Conectado a ' + process.env.DB_NAME + ' como ' + process.env.DB_USER);
    connection.release();
  } catch (error) {
    console.error('❌ DATABASE ERROR:', error.message);
    console.error('Intento de conexión con:', {
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST
    });
  }
})();

module.exports = pool;