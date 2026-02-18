const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
// const AppError = require('../utils/AppError'); // Removed to fix crash as it is unused

class AuthService {
    static async register(userData) {
        const { username, email, password } = userData;

        // Check if user exists
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Create user
        const userId = await UserModel.create({
            username,
            email,
            passwordHash
        });

        return { id: userId, username, email };
    }

    static async login(credentials) {
        const { email, password } = credentials;

        // Find user
        const user = await UserModel.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // specific check for password match
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'supersecretkey',
            { expiresIn: '1h' }
        );

        return {
            token,
            user: { id: user.id, username: user.username, email: user.email }
        };
    }
}

module.exports = AuthService;
