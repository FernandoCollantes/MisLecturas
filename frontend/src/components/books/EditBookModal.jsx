import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { FiX } from 'react-icons/fi';
import { useConfirm } from '../../context/ConfirmationContext';

const EditBookModal = ({ book, isOpen, onClose, onSave }) => {
    const confirm = useConfirm();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        status: 'pending',
        created_at: '',
        finished_at: '',
        review: ''
    });

    useEffect(() => {
        if (book) {
            const formatDate = (dateString) => {
                if (!dateString) return '';
                return new Date(dateString).toISOString().split('T')[0];
            };

            setFormData({
                title: book.title,
                author: book.author,
                status: book.status,
                created_at: formatDate(book.created_at),
                finished_at: formatDate(book.finished_at),
                review: book.review || ''
            });
        }
    }, [book]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClose = async () => {
        const isConfirmed = await confirm(
            '¿Descartar cambios?',
            '¿Estás seguro de que quieres cerrar sin guardar?'
        );
        if (isConfirmed) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isConfirmed = await confirm(
            '¿Guardar cambios?',
            '¿Estás seguro de que quieres guardar los cambios en este libro?'
        );
        if (isConfirmed) {
            onSave(book.id, formData);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.4)', // Glass overlay
            backdropFilter: 'blur(5px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
        }}>
            <Card style={{
                width: '90%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Editar Libro</h3>
                    <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)' }}>
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Input
                        label="Título"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Autor"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Estado</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid #e5e7eb',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '1rem',
                                color: 'var(--text-main)',
                                outline: 'none'
                            }}
                        >
                            <option value="pending">Pendiente</option>
                            <option value="reading">Leyendo</option>
                            <option value="finished">Terminado</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                            Reseña (Máx. 50 palabras)
                        </label>
                        <textarea
                            name="review"
                            value={formData.review}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                minHeight: '100px',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid #e5e7eb',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '1rem',
                                color: 'var(--text-main)',
                                outline: 'none',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                            placeholder="Escribe tu breve opinión aquí..."
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input
                            label="Fecha de Inicio"
                            type="date"
                            name="created_at"
                            value={formData.created_at}
                            onChange={handleChange}
                        />
                        {formData.status === 'finished' && (
                            <Input
                                label="Fecha de Fin"
                                type="date"
                                name="finished_at"
                                value={formData.finished_at}
                                onChange={handleChange}
                            />
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <Button variant="ghost" onClick={handleClose}>Cancelar</Button>
                        <Button type="submit" variant="primary" style={{ flex: 1 }}>Guardar Cambios</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default EditBookModal;
