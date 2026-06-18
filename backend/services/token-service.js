const jwt = require("jsonwebtoken")
const tokenModel = require("../models/token-model")

class TokenService {
	generateToken(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCSESS_KEY, { expiresIn: "1m" })
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: "30d" })
		return { accessToken, refreshToken }
	}
	async saveToken(userId, refreshToken) {
		const existToken = await tokenModel.findOne({ user: userId })
		if (existToken) {
			existToken.refreshToken = refreshToken
			return existToken.save()
		}
		const token = await tokenModel.create({ user: userId, refreshToken })
		return token
	}
	async removeToken(refreshToken) {
		const token = await tokenModel.findOneAndDelete({ refreshToken })
		return token
	}
	async findToken(refreshToken) {
		const token = await tokenModel.findOne({ refreshToken })
		return token
	}
	validateRefreshToken(refreshToken) {
		try {
			const VD_refreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY)
			return VD_refreshToken
		} catch (error) {
			return null
		}
	}
	validateAccessToken(accessToken) {
		try {
			const VD_accessToken = jwt.verify(accessToken, process.env.JWT_ACCSESS_KEY)
			return VD_accessToken
		} catch (error) {
			return null
		}
	}
}

module.exports = new TokenService()