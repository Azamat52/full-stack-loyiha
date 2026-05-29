const UserDto = require('../dtos/user-dto');
const UserModel = require('../models/user-model')
const bcrypt = require("bcrypt");
const tokenService = require('./token-service');
const MailService = require("./email-service");
const BaseError = require('../errors/base-error');

class AuthService {
    async registar(email, password, username) {
        const existUserEmail = await UserModel.findOne({ email })
        const existUserUsername = await UserModel.findOne({ username })
        // check email and username
        if (existUserEmail) {
            throw BaseError.BadRequest(`Email(${email}) is already taken`);
        }
        if (existUserUsername) {
            throw BaseError.BadRequest(`Username(${username}) is already taken`);
        }
        // hasing password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = { email, password: hashedPassword, username }
        const user = await UserModel.create(newUser)
        console.log(user);
        // sort user info
        const userDto = new UserDto(user)
        // SMTP 
        await MailService.activateMail(email, `${process.env.ACTIVATION_LINK}/api/auth/activation/${userDto.id}`)
        // jwt TOKENS 
        const tokens = tokenService.generateToken({ userDto })
        const info = { userInfo: userDto, tokens }
        return { user: info }
    }
    async activation(userId) {
        console.log("your acc is activated");
        const user = await UserModel.findById(userId)
        if (!user) {
            throw BaseError.BadRequest("UserId is not defined , please check your email");
        }
        user.isActivated = true
        return user.save()
    }
    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw BaseError.BadRequest("Email is incorrect, please try again");
        }
        const unHashedPassword = await bcrypt.compare(password, user.password)
        if (!unHashedPassword) {
            throw BaseError.BadRequest("Password is incorrect, try again");
        }
        // sort user info
        const userDto = new UserDto(user)
        // jwt TOKENS 
        const tokens = tokenService.generateToken({ userDto })
        // saveToken
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { userDto, ...tokens }
    }
    async logout(refreshToken) {
        const removedToken = await tokenService.removeToken(refreshToken)
        return removedToken
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw BaseError.BadRequest("Bad autharithation");
        }
        const payload = await tokenService.validateRefreshToken(refreshToken)
        const DB_refreshToken = await tokenService.findToken(refreshToken)
        // check
        if (!payload || !DB_refreshToken) {
            throw BaseError.BadRequest("Bad autharithation!!!!");
        }
        const user = await UserModel.findById(payload.userDto.id)
        // sort user info
        const userDto = new UserDto(user)
        // jwt TOKENS 
        const tokens = tokenService.generateToken({ userDto })
        // saveToken
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { userDto, ...tokens }
    }
    async getUsers() {
        const allUser = await UserModel.find()
        return allUser
    }
    async deleteAll() {
        const deletedUsers = await UserModel.deleteMany({})
        return deletedUsers
    }
}

module.exports = new AuthService()
