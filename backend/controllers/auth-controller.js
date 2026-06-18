const BaseError = require('../errors/base-error')
const AuthService = require("../services/auth-service")
const { validationResult } = require("express-validator")

class AuthController {
    async registar(req, res, next) {
        try {
            const { username, email, password } = req.body
            const user = await AuthService.registar(email, password, username)
            res.cookie("refreshToken", user.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            return res.status(201).json(user)
        } catch (error) {
            next(error);
        }
    }
    async activation(req, res, next) {
        try {
            const UserDto = await AuthService.activation(req.params.id)
            return res.redirect(process.env.FRONTEND_LINK)
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            console.log(req.body);
            const { email, password } = req.body
            const USER = await AuthService.login(email, password)
            res.cookie("refreshToken", USER.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            return res.status(201).json(USER)
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await AuthService.logout(refreshToken)
            res.clearCookie("refreshToken")
            res.status(200).json(token)
        } catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const user = await AuthService.refresh(refreshToken)
            res.cookie("refreshToken", user.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            return res.status(200).json(user)
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await AuthService.getUsers()
            return res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }
    async deleteAll(req, res, next) {
        try {
            await AuthService.deleteAll()
            return res.status(200).json({ message: "Users successfully deleted" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()