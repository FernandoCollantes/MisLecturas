const BookModel = require('../models/BookModel');

class BookService {
    static async createBook(userId, bookData) {
        // Basic validation
        if (!bookData.title || !bookData.author) {
            throw new Error('Title and author are required');
        }

        const bookId = await BookModel.create({
            userId,
            ...bookData
        });

        return { id: bookId, userId, ...bookData };
    }

    static async getUserBooks(userId) {
        return await BookModel.findAllByUserId(userId);
    }

    static async updateBook(userId, bookId, updateData) {
        // Verify ownership
        const book = await BookModel.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        if (book.user_id !== userId) {
            throw new Error('Unauthorized access to book');
        }

        // Logic for finished_at
        let finishedAt = updateData.finished_at;

        // If status changes to 'finished' and no date provided, set it to today
        if (updateData.status === 'finished' && book.status !== 'finished' && !finishedAt) {
            finishedAt = new Date().toISOString().split('T')[0];
        }
        // If status changes from 'finished' to something else, clear the date (optional, but logical)
        else if (updateData.status && updateData.status !== 'finished') {
            finishedAt = null;
        }

        const dataToUpdate = {
            title: updateData.title || book.title,
            author: updateData.author || book.author,
            status: updateData.status || book.status,
            rating: updateData.rating || book.rating,
            created_at: updateData.created_at || book.created_at, // Allow editing created_at
            finished_at: finishedAt !== undefined ? finishedAt : book.finished_at,
            review: updateData.review !== undefined ? updateData.review : book.review
        };

        const success = await BookModel.update(bookId, dataToUpdate);
        if (!success) {
            throw new Error('Failed to update book');
        }

        return { id: bookId, ...dataToUpdate };
    }

    static async deleteBook(userId, bookId) {
        // Verify ownership
        const book = await BookModel.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        if (book.user_id !== userId) {
            throw new Error('Unauthorized access to book');
        }

        const success = await BookModel.delete(bookId);
        if (!success) {
            throw new Error('Failed to delete book');
        }

        return { message: 'Book deleted successfully' };
    }
}

module.exports = BookService;
