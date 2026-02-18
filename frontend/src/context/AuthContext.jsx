import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.clear();
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            console.log("1. Enviando petición de login...");
            
            // Petición al backend
            const response = await api.post('/auth/login', { email, password });
            
            console.log("2. Respuesta recibida RAW:", response);
            console.log("3. Datos de la respuesta:", response.data);

            // Verificación de seguridad
            if (!response.data || !response.data.token) {
                console.error("ERROR CRÍTICO: El servidor no devolvió un token. Recibido:", response.data);
                throw new Error("Respuesta del servidor inválida (Falta token)");
            }

            const { token, user: userData } = response.data;

            // Guardado en Storage
            console.log("4. Intentando guardar en localStorage...");
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Verificación inmediata
            const checkToken = localStorage.getItem('token');
            console.log("5. Verificación post-guardado. Token en storage:", checkToken);

            if (!checkToken) {
                console.error("ALERTA: El navegador bloqueó la escritura en localStorage.");
            } else {
                console.log("¡ÉXITO! Token guardado correctamente.");
            }

            setUser(userData);
            return { success: true };

        } catch (error) {
            console.error("❌ ERROR EN LOGIN:", error);
            // Si es error de respuesta (ej: 401)
            if (error.response) {
                console.error("Datos del error servidor:", error.response.data);
                return {
                    success: false,
                    message: error.response.data.message || 'Error del servidor'
                };
            }
            // Si es error de código (ej: variable undefined)
            return {
                success: false,
                message: 'Error de conexión o código: ' + error.message
            };
        }
    };

    const register = async (username, email, password) => {
        try {
            await api.post('/auth/register', { username, email, password });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error en el registro'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};