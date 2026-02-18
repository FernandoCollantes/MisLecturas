const db = require('../config/db');

class BookModel {
    static async create({ userId, title, author, status = 'pending', rating = 0, review = '' }) {
        const query = `
      INSERT INTO books (user_id, title, author, status, rating, review)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
        const [result] = await db.execute(query, [userId, title, author, status, rating, review]);
        return result.insertId;
    }

    static async findAllByUserId(userId) {
        const query = 'SELECT * FROM books WHERE user_id = ? ORDER BY created_at DESC';
        const [rows] = await db.execute(query, [userId]);
        return rows;
    }

    static async findById(id) {
        const query = 'SELECT * FROM books WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }

    static async update(id, { title, author, status, rating, created_at, finished_at, review }) {
        const query = `
      UPDATE books 
      SET title = ?, author = ?, status = ?, rating = ?, created_at = ?, finished_at = ?, review = ?
      WHERE id = ?
    `;
        const [result] = await db.execute(query, [title, author, status, rating, created_at, finished_at, review, id]);
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const query = 'DELETE FROM books WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = BookModel;
