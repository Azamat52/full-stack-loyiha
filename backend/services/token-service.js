const jwt = require("jsonwebtoken")
const tokenModel = require("../models/token-model")

class TokenService {
	generateToken(payload) {
		const accsessToken = jwt.sign(payload, process.env.JWT_ACCSESS_KEY, { expiresIn: "10m" })
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: "30d" })
		return { accsessToken, refreshToken }
	}
	async saveToken(userId, refreshToken) {
		const existToken = await tokenModel.findOne({user: userId})

		if(existToken){
			existToken.refreshToken = refreshToken
			return existToken.save()
		}
		const token = await tokenModel.create({user: userId, refreshToken})
		return token
	}
}

module.exports = new TokenService()