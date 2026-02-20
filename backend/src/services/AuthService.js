const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

class AuthService {
    static async register(userData) {
        const { username, email, password } = userData;

        try {
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                throw new Error('El usuario ya existe');
            }

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            // Aquí es donde suele ocurrir el Error 500 si el Modelo está mal
            const userId = await UserModel.create({
                username,
                email,
                passwordHash
            });

            return { id: userId, username, email };
        } catch (error) {
            console.error("❌ Error en AuthService (Register):", error.message);
            throw error; // Re-lanzamos para que el controlador lo capture
        }
    }

    static async login(credentials) {
        const { email, password } = credentials;

        try {
            const user = await UserModel.findByEmail(email);
            if (!user) {
                throw new Error('Credenciales inválidas');
            }

            // OJO: Asegúrate de que en la DB la columna se llame password_hash
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                throw new Error('Credenciales inválidas');
            }

            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error('Error interno: JWT_SECRET no configurado');
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                secret,
                { expiresIn: '1h' }
            );

            return {
                token,
                user: { id: user.id, username: user.username, email: user.email }
            };
        } catch (error) {
            console.error("❌ Error en AuthService (Login):", error.message);
            throw error;
        }
    }
}

module.exports = AuthService;