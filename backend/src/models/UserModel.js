const db = require('../config/db');

class UserModel {
    static async create({ username, email, passwordHash }) {
        const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES (?, ?, ?)
    `;
        const [result] = await db.execute(query, [username, email, passwordHash]);
        return result.insertId;
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    }

    static async findById(id) {
        const query = 'SELECT id, username, email, created_at FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }
}

module.exports = UserModel;
