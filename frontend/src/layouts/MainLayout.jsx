import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { FiLogOut, FiBook, FiGrid, FiUser } from 'react-icons/fi';

import { useConfirm } from '../context/ConfirmationContext';

const MainLayout = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const confirm = useConfirm();

    const handleLogout = async () => {
        const isConfirmed = await confirm(
            'Cerrar Sesión',
            '¿Estás seguro de que quieres cerrar sesión?'
        );

        if (isConfirmed) {
            logout();
            navigate('/login');
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="page-content">
            {/* Floating Navbar */}
            <nav style={{
                position: 'fixed',
                top: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '95%',
                maxWidth: 'var(--container-width)',
                height: 'var(--header-height)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--glass-shadow)',
            }}>
                {/* Logo */}
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FiBook /> MisLecturas
                </Link>

                {/* Navigation Links */}
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <Link
                            to="/dashboard"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500',
                                color: isActive('/dashboard') ? 'var(--primary-color)' : 'var(--text-secondary)'
                            }}
                        >
                            <FiGrid /> Panel
                        </Link>
                        <Link
                            to="/books"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500',
                                color: isActive('/books') ? 'var(--primary-color)' : 'var(--text-secondary)'
                            }}
                        >
                            <FiBook /> Mis Libros
                        </Link>
                        <div style={{ width: '1px', height: '24px', backgroundColor: '#e5e7eb' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hola, <strong>{user.username}</strong></span>
                            <Button variant="ghost" onClick={handleLogout} style={{ padding: '0.5rem' }} title="Cerrar Sesión">
                                <FiLogOut size={20} />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login">
                            <Button variant="ghost">Entrar</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="primary">Registrarse</Button>
                        </Link>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="container" style={{ marginTop: '2rem' }}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
