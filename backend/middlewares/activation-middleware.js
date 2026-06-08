const BaseError = require("../errors/base-error")

module.exports = function (req, res, next) {

	try {

		if (!req.user.isActivated) {

			return next(
				BaseError.BadRequest(
					"You should activate your account to create new posts"
				)
			)
		}

		next()

	} catch (error) {

		next(error)

	}
}