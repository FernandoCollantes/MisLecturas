import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/books');
            setBooks(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch books');
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const addBook = async (bookData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/books', bookData);
            setBooks((prevBooks) => [response.data, ...prevBooks]);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add book');
            return { success: false, message: err.response?.data?.message };
        } finally {
            setLoading(false);
        }
    };

    const updateBook = async (id, updates) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(`/books/${id}`, updates);
            setBooks((prevBooks) => prevBooks.map(book => book.id === id ? { ...book, ...updates } : book));
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update book');
            return { success: false, message: err.response?.data?.message };
        } finally {
            setLoading(false);
        }
    }

    const removeBook = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/books/${id}`);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete book');
            return { success: false, message: err.response?.data?.message };
        } finally {
            setLoading(false);
        }
    };

    return { books, loading, error, fetchBooks, addBook, updateBook, removeBook };
};
