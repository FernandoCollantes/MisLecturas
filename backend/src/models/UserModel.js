const db = require('../config/db');

class UserModel {
    static async create({ username, email, passwordHash }) {
        // Usamos 'users' porque es el nombre real en tu BD según el DESCRIBE
        const query = `
            INSERT INTO users (username, email, password_hash)
            VALUES (?, ?, ?)
        `;
        try {
            const [result] = await db.execute(query, [username, email, passwordHash]);
            return result.insertId;
        } catch (error) {
            console.error("❌ Error SQL en UserModel.create:", error.message);
            throw error;
        }
    }

    static async findByEmail(email) {
        // Usamos 'users' para buscar el correo
        const query = 'SELECT * FROM users WHERE email = ?';
        try {
            const [rows] = await db.execute(query, [email]);
            return rows[0];
        } catch (error) {
            console.error("❌ Error SQL en UserModel.findByEmail:", error.message);
            throw error;
        }
    }

    static async findById(id) {
        // Usamos 'users' y las columnas exactas: id, username, email, created_at
        const query = 'SELECT id, username, email, created_at FROM users WHERE id = ?';
        try {
            const [rows] = await db.execute(query, [id]);
            return rows[0];
        } catch (error) {
            console.error("❌ Error SQL en UserModel.findById:", error.message);
            throw error;
        }
    }
}

module.exports = UserModel;