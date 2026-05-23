const AuthService = require("../services/auth-service")

class AuthController {
    async registar(req, res) {
        try {
            const UserDto = await AuthService.register(req.body)
            res.status(201).json({ user: UserDto })            
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new AuthController()