import React, { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { FiBookOpen, FiEdit2, FiTrash2, FiCalendar, FiCheckCircle, FiClock } from 'react-icons/fi';

const BookItem = ({ book, onEdit, onDelete, formatDate }) => {
    const [showReview, setShowReview] = useState(false);

    const statusLabels = {
        reading: 'Leyendo',
        pending: 'Pendiente',
        finished: 'Terminado'
    };

    return (
        <Card style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            {/* Header */}
            <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.3' }}>
                            {book.title}
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            por <span style={{ fontStyle: 'italic' }}>{book.author}</span>
                        </p>
                    </div>
                </div>
                <Badge status={book.status}>
                    {book.status === 'reading' && <span style={{ marginRight: '4px', display: 'inline-flex', alignItems: 'center' }}><FiBookOpen /></span>}
                    {book.status === 'pending' && <span style={{ marginRight: '4px', display: 'inline-flex', alignItems: 'center' }}><FiClock /></span>}
                    {book.status === 'finished' && <span style={{ marginRight: '4px', display: 'inline-flex', alignItems: 'center' }}><FiCheckCircle /></span>}
                    {statusLabels[book.status] || book.status}
                </Badge>
            </div>

            {/* Dates */}
            <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <FiCalendar size={14} /> <span>Añadido: {formatDate(book.created_at)}</span>
                </div>
                {book.status === 'finished' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--status-finished)' }}>
                        <FiCheckCircle size={14} /> <span>Terminado: {formatDate(book.finished_at)}</span>
                    </div>
                )}
            </div>

            {/* Review Section */}
            {book.review && (
                <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                    <button
                        onClick={() => setShowReview(!showReview)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary-color)',
                            cursor: 'pointer',
                            padding: 0,
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}
                    >
                        {showReview ? 'Ocultar Reseña ▲' : 'Ver Reseña ▼'}
                    </button>

                    {showReview && (
                        <div style={{
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.9rem',
                            borderLeft: '3px solid var(--primary-color)',
                            fontStyle: 'italic',
                            color: 'var(--text-secondary)'
                        }}>
                            "{book.review}"
                        </div>
                    )}
                </div>
            )}
            {!book.review && <div style={{ flex: 1 }}></div>}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                <Button
                    variant="secondary"
                    onClick={() => onEdit(book)}
                    className="flex-1"
                    style={{ flex: 1, justifyContent: 'center' }}
                >
                    <FiEdit2 size={16} /> Editar
                </Button>
                <Button
                    variant="danger"
                    onClick={() => onDelete(book.id)}
                    style={{ padding: '0.75rem' }}
                    title="Eliminar libro"
                >
                    <FiTrash2 size={16} />
                </Button>
            </div>
        </Card>
    );
};

export default BookItem;
