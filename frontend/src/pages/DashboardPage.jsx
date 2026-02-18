import { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import { useAlert } from '../context/AlertContext';
import { useConfirm } from '../context/ConfirmationContext';
import MainLayout from '../layouts/MainLayout';
import BookItem from '../components/books/BookItem';
import EditBookModal from '../components/books/EditBookModal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { FiPlus, FiGrid, FiList } from 'react-icons/fi';

const DashboardPage = () => {
    const { books, loading, error, addBook, removeBook, updateBook } = useBooks();
    const { showAlert } = useAlert();
    const confirm = useConfirm();

    // Local state for the add book form
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [editingBook, setEditingBook] = useState(null); // State for editing

    const handleAddBook = async (e) => {
        e.preventDefault();
        if (!title || !author) {
            showAlert('El título y el autor son obligatorios', 'error');
            return;
        }

        const result = await addBook({ title, author, status: 'pending' });
        if (result.success) {
            setTitle('');
            setAuthor('');
            showAlert('¡Libro añadido con éxito!', 'success');
        } else {
            showAlert(result.message || 'Error al añadir el libro', 'error');
        }
    };

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
    };

    // Helper to format date display (reused from BookList, ideally could be a util)
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Calculate stats
    const totalBooks = books.length;
    const readingBooks = books.filter(b => b.status === 'reading').length;
    const finishedBooks = books.filter(b => b.status === 'finished').length;

    return (
        <MainLayout>
            {/* Stats Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <Card style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-color)' }}>{totalBooks}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Libros Totales</p>
                </Card>
                <Card style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--status-reading)' }}>{readingBooks}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Leyendo Ahora</p>
                </Card>
                <Card style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--status-finished)' }}>{finishedBooks}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Finalizados</p>
                </Card>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Add Book Form */}
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>Añadir Nuevo Libro</h2>
                    </div>
                    <Card>
                        <form onSubmit={handleAddBook} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', '@media (min-width: 768px)': { flexDirection: 'row' } }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', width: '100%' }}>
                                <Input
                                    placeholder="Título del Libro"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mb-0"
                                />
                                <Input
                                    placeholder="Autor"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="mb-0"
                                />
                                <Button type="submit" variant="primary">
                                    <FiPlus size={20} /> Añadir Libro
                                </Button>
                            </div>
                        </form>
                    </Card>
                </section>

                {/* Recent Books */}
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>Libros Recientes</h2>
                        <Button variant="ghost" onClick={() => navigate('/books')}>Ver Todo</Button>
                    </div>

                    {loading && <p>Cargando...</p>}
                    {error && <p style={{ color: 'var(--status-error)' }}>{error}</p>}

                    {!loading && books.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
                            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Tu biblioteca está vacía.</p>
                            <p>¡Empieza añadiendo un libro arriba!</p>
                        </div>
                    )}

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {books.slice(0, 6).map((book) => ( // Show only recent 6
                            <BookItem
                                key={book.id}
                                book={book}
                                onEdit={handleEditClick}
                                onDelete={() => handleDelete(book.id)}
                                formatDate={formatDate}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <EditBookModal
                book={editingBook}
                isOpen={!!editingBook}
                onClose={() => setEditingBook(null)}
                onSave={handleSaveEdit}
            />
        </MainLayout>
    );
};

export default DashboardPage;
