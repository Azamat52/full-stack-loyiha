const UserDto = require('../dtos/user-dto');
const UserModel = require('../models/user-model')
const bcrypt = require("bcrypt");
const tokenService = require('./token-service');
const MailService = require("./email-service");

class AuthService {
    async registar(email, password, username) {
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
        // SMTP 
        await MailService.activateMail(email, `${process.env.ACTIVATION_LINK}/api/auth/activation/${userDto.id}`)
        // jwt TOKENS 
        const tokens = tokenService.generateToken({ userDto })
        // saveToken
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { user: userDto, ...tokens }
    }
    async activation(userId) {
        const user = await UserModel.findById(userId)
        if (!user) {
            console.log("User is not defined, please check your email");
        }
        user.isActivted = true
        return user.save()
    }
    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw new Error("User is not defined, please registar again");
        }
        const unHashedPassword = await bcrypt.compare(password, user.password)
        if (!unHashedPassword) {
            throw new Error("Password is incorrect, try again");
        }
        // sort user info
        const userDto = new UserDto(user)
        // jwt TOKENS 
        const tokens = tokenService.generateToken({ userDto })
        // saveToken
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { user: userDto, ...tokens }
    }
    async logout(refreshToken) {
        const removedToken = await tokenService.removeToken(refreshToken)
        return removedToken
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error("Bad autharithation");
        }
        const payload = await tokenService.validateRefreshToken(refreshToken)
        const DB_refreshToken = await tokenService.findToken(refreshToken)
        // check
        if (!payload || !DB_refreshToken) {
            throw new Error("Bad autharithation!!!!");
        }
        const user = await UserModel.findById(payload.userDto.id)
        // sort user info
        const userDto = new UserDto(user)
        // jwt TOKENS 
        const tokens = tokenService.generateToken({ userDto })
        // saveToken
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { user: userDto, ...tokens }
    }
}

module.exports = new AuthService()
