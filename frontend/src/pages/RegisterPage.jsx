import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            showAlert('Por favor, rellena todos los campos', 'error');
            return;
        }

        const result = await register(username, email, password);

        if (result.success) {
            showAlert('¡Registro completado! Por favor, inicia sesión.', 'success');
            navigate('/login');
        } else {
            showAlert(result.message, 'error');
        }
    };

    return (
        <MainLayout>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <Card style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-color)' }}>Únete a nosotros</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Comienza tu viaje de lectura hoy mismo</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Input
                            label="Usuario"
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Elige un nombre de usuario"
                            required
                        />
                        <Input
                            label="Correo Electrónico"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                        />
                        <Input
                            label="Contraseña"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            required
                        />
                        <Button type="submit" variant="primary" style={{ marginTop: '0.5rem' }}>
                            Crear Cuenta
                        </Button>
                    </form>

                    <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        ¿Ya tienes una cuenta? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Inicia sesión aquí</Link>
                    </p>
                </Card>
            </div>
        </MainLayout>
    );
};

export default RegisterPage;
