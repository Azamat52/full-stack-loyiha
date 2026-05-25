const BaseError = require('../errors/base-error')
const tokenService = require('../services/token-service')

module.exports = function (req, res, next) {
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

		req.user = userDto
		next()
	} catch (error) {
		next(BaseError.UnAutharized())
	}
}