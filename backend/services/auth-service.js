const UserModel = require('../models/user-model')

class AuthService {
    async register(UserData) {
        const UserDto = await UserModel.create(UserData)
        return UserDto
    }
}

module.exports = new AuthService()