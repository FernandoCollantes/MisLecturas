const AuthService = require('../services/AuthService');

class AuthController {
    static async register(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const user = await AuthService.register({ username, email, password });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            console.error(error);
            if (error.message === 'User already exists') {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const result = await AuthService.login({ email, password });
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            if (error.message === 'Invalid credentials') {
                return res.status(401).json({ message: error.message });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = AuthController;
