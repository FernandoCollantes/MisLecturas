const BookService = require('../services/BookService');

class BookController {
    static async create(req, res) {
        try {
            const userId = req.user.id;
            const bookData = req.body;
            const book = await BookService.createBook(userId, bookData);
            res.status(201).json(book);
        } catch (error) {
            console.error(error);
            if (error.message === 'Title and author are required') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAll(req, res) {
        try {
            const userId = req.user.id;
            const books = await BookService.getUserBooks(userId);
            res.status(200).json(books);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async update(req, res) {
        try {
            const userId = req.user.id;
            const bookId = req.params.id;
            const updateData = req.body;
            const updatedBook = await BookService.updateBook(userId, bookId, updateData);
            res.status(200).json(updatedBook);
        } catch (error) {
            console.error(error);
            if (error.message === 'Book not found') {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === 'Unauthorized access to book') {
                return res.status(403).json({ message: error.message });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async delete(req, res) {
        try {
            const userId = req.user.id;
            const bookId = req.params.id;
            const result = await BookService.deleteBook(userId, bookId);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            if (error.message === 'Book not found') {
                return res.status(404).json({ message: error.message });
            }
            if (error.message === 'Unauthorized access to book') {
                return res.status(403).json({ message: error.message });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = BookController;
