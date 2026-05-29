const BaseError = require('../errors/base-error')
const tokenModel = require('../models/token-model')
const tokenService = require('../services/token-service')

module.exports = async function (req, res, next) {
	try {
		const auth = req.headers.authorization
		if (!auth) {
			return next(BaseError.UnAutharized())
		}

		const accessToken = auth.split(" ")[1]
		if (!accessToken) {
			return next(BaseError.UnAutharized())
		}

		const { userDto } = tokenService.validateAccessToken(accessToken)
		if (!userDto) {
			return next(BaseError.UnAutharized())
		}
		
		const checkedUserDto = await tokenModel.findOne({ user: userDto.id }).populate("user")
		if (!checkedUserDto) {
			return next(BaseError.UnAutharized())
		}

		req.user = checkedUserDto.user
		next()
	} catch (error) {
		return next(BaseError.UnAutharized())
	}
}