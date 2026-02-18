const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

class AuthService {
    static async register(userData) {
        const { username, email, password } = userData;

        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            throw new Error('El usuario ya existe');
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const userId = await UserModel.create({
            username,
            email,
            passwordHash
        });

        return { id: userId, username, email };
    }

    static async login(credentials) {
        const { email, password } = credentials;

        const user = await UserModel.findByEmail(email);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        // Obligamos a usar la variable de entorno para máxima seguridad
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('Error interno: JWT_SECRET no configurado en el servidor');
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
    }
}

module.exports = AuthService;