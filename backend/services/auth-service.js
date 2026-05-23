const UserDto = require('../dtos/user-dto');
const UserModel = require('../models/user-model')
const bcrypt = require("bcrypt");
const tokenService = require('./token-service');

class AuthService {
    async register(email, password, username) {
        const existUserEmail = await UserModel.findOne({ email })
        const existUserUsername = await UserModel.findOne({ username })

        // check email and username
        if (existUserEmail) {
            throw new Error(`Error: Email(${email}) is already taken`);
        }
        if (existUserUsername) {
            throw new Error(`Error: Username(${username}) is already taken`);
        }
        // hasing password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = { email, password: hashedPassword, username }
        const user = await UserModel.create(newUser)
        // sort user info
        const userDto = new UserDto(user)
        // jwt TOKENS 
        const tokens = tokenService.generateToken({ userDto })
        // saveToken
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { user: userDto, ...tokens }
    }
    async activation(userId) {
        const user = await UserModel.findById(userId)
        if (!user) {
            console.log("User is not defined, please registar");
        }
        user.isActivted = true
        return user.save()
    }
}

module.exports = new AuthService()
