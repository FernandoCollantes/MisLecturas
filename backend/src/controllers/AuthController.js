const AuthService = require('../services/AuthService');

class AuthController {
    static async register(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }

            const user = await AuthService.register({ username, email, password });
            res.status(201).json({ message: 'Usuario registrado con éxito', user });
        } catch (error) {
            console.error("Error en Registro:", error.message);
            if (error.message === 'El usuario ya existe') {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            
            // Validación básica
            if (!email || !password) {
                return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
            }

            // Llamada al servicio
            const result = await AuthService.login({ email, password });
            
            // LOG DE DEPURACIÓN (Verás esto en la terminal de VSCode/Node)
            console.log(`Login exitoso para: ${email}. Token generado: ${!!result.token}`);
            
            // Enviamos la respuesta exactamente como el frontend la espera
            // result ya es { token: "...", user: {...} }
            res.status(200).json(result);

        } catch (error) {
            console.error("Error en Login:", error.message);
            
            // Manejo de errores específico
            if (error.message === 'Credenciales inválidas') {
                return res.status(401).json({ message: 'Email o contraseña incorrectos' });
            } else if (error.message.includes('JWT_SECRET')) {
                 return res.status(500).json({ message: 'Error de configuración en el servidor' });
            }
            
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

module.exports = AuthController;