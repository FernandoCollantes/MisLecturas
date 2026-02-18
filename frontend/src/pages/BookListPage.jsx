import { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import { useAlert } from '../context/AlertContext';
import { useConfirm } from '../context/ConfirmationContext';
import MainLayout from '../layouts/MainLayout';
import BookItem from '../components/books/BookItem';
import EditBookModal from '../components/books/EditBookModal';

import { FiBookOpen, FiClock, FiCheckCircle } from 'react-icons/fi';

const BookListPage = () => {
    const { books, loading, error, removeBook, updateBook } = useBooks();
    const { showAlert } = useAlert();
    const confirm = useConfirm();
    const [editingBook, setEditingBook] = useState(null);

    const handleEditClick = (book) => {
        setEditingBook(book);
    };

    const handleSaveEdit = async (id, updates) => {
        const result = await updateBook(id, updates);
        if (result.success) {
            setEditingBook(null);
            showAlert('¡Libro actualizado con éxito!', 'success');
        } else {
            showAlert(result.message || 'Error al actualizar el libro', 'error');
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = await confirm(
            'Eliminar Libro',
            '¿Estás seguro de que quieres eliminar permanentemente este libro?'
        );

        if (isConfirmed) {
            const success = await removeBook(id);
            if (success) {
                showAlert('Libro eliminado con éxito', 'success');
            } else {
                showAlert('Error al eliminar el libro', 'error');
            }
        }
    }

    // Helper to filter books by status
    const getBooksByStatus = (status) => books.filter((book) => book.status === status);

    // Helper to format date display
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const renderBookSection = (icon, title, bookList) => (
        <div style={{ marginBottom: '4rem' }}>
            <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--text-secondary)',
                borderBottom: '2px solid rgba(0,0,0,0.05)',
                paddingBottom: '0.5rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <span style={{ color: 'var(--primary-color)', display: 'flex' }}>{icon}</span> {title} <span style={{ fontSize: '1rem', fontWeight: '400', color: 'var(--text-light)' }}>({bookList.length})</span>
            </h3>

            {bookList.length === 0 ? (
                <p style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>No hay libros en esta sección.</p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {bookList.map((book) => (
                        <BookItem
                            key={book.id}
                            book={book}
                            onEdit={handleEditClick}
                            onDelete={() => handleDelete(book.id)}
                            formatDate={formatDate}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <MainLayout>
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)' }}>Mi Colección</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Gestiona tu viaje de lectura.</p>
            </div>

            {loading && !editingBook && <p>Cargando libros...</p>}
            {error && <p style={{ color: 'var(--status-error)' }}>Error: {error}</p>}

            {!loading && books.length === 0 && <p>No se encontraron libros en tu biblioteca.</p>}

            {!loading && books.length > 0 && (
                <>
                    {renderBookSection(<FiBookOpen />, 'Leyendo Ahora', getBooksByStatus('reading'))}
                    {renderBookSection(<FiClock />, 'Pendientes', getBooksByStatus('pending'))}
                    {renderBookSection(<FiCheckCircle />, 'Finalizados', getBooksByStatus('finished'))}
                </>
            )}

            <EditBookModal
                book={editingBook}
                isOpen={!!editingBook}
                onClose={() => setEditingBook(null)}
                onSave={handleSaveEdit}
            />
        </MainLayout>
    );
};

export default BookListPage;
