const AuthService = require('../services/AuthService');

class AuthController {
    static async register(req, res) {
        // Log para ver qué llega desde el frontend
        console.log("📥 Petición de registro recibida:", req.body);

        try {
            const { username, email, password } = req.body;
            
            if (!username || !email || !password) {
                console.warn("⚠️ Campos faltantes en el registro");
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }

            const user = await AuthService.register({ username, email, password });
            
            console.log("✅ Usuario registrado con éxito en la DB:", email);
            res.status(201).json({ message: 'Usuario registrado con éxito', user });
        } catch (error) {
            // Este log es vital: aquí veremos el error real de MySQL si AuthService falla
            console.error("❌ ERROR DETALLADO EN REGISTRO:", error); 
            
            if (error.message === 'El usuario ya existe') {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ 
                message: 'Error interno del servidor',
                details: error.message // Enviamos el detalle para depurar más rápido
            });
        }
    }

    static async login(req, res) {
        console.log("📥 Intento de login para:", req.body.email);
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
            }

            const result = await AuthService.login({ email, password });
            
            console.log(`✅ Login exitoso: ${email}`);
            res.status(200).json(result);

        } catch (error) {
            console.error("❌ ERROR DETALLADO EN LOGIN:", error);
            
            if (error.message === 'Credenciales inválidas') {
                return res.status(401).json({ message: 'Email o contraseña incorrectos' });
            }
            
            res.status(500).json({ 
                message: 'Error interno del servidor',
                details: error.message 
            });
        }
    }
}

module.exports = AuthController;