import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de Petición: Inyectar Token automáticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de Respuesta: Gestión de errores globales (Token expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el servidor responde 401 (No autorizado)
        if (error.response && error.response.status === 401) {
            
            // EVITAR BUCLE: Si ya estamos en login, no hacemos nada
            if (window.location.pathname.includes('/login')) {
                return Promise.reject(error);
            }

            console.warn("Sesión expirada o inválida (401). Limpiando storage...");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Redirigir al login
            window.location.href = '/login?expired=true';
        }
        return Promise.reject(error);
    }
);

export default api;