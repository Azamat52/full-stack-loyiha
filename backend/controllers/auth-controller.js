const AuthService = require("../services/auth-service")

class AuthController {
    async registar(req, res, next) {
        try {
            const { username, email, password } = req.body
            const UserDto = await AuthService.register(email, password, username)
            res.cookie("refreshToken", UserDto.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }) 
            res.status(201).json(UserDto)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
    async activation(req, res, next) {
        try {
            const UserDto = await AuthService.activation(req.params.id)
            res.status(201).json(UserDto)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AuthController()