const BaseError = require("../errors/base-error");

module.exports = function (req, res, next) {
	
	try {
		if (!req.files || !req.files.picture) {
			return next(
				BaseError.BadRequest("Picture is required")
			);
		}

		const picture = req.files.picture;

		const allowedTypes = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/webp",
		];
		
		if (!allowedTypes.includes(picture.mimetype)) {
			return next(
				BaseError.BadRequest(
					"Only jpg, jpeg, png and webp images are allowed"
				)
			);
		}

		next();
	} catch (error) {
		next(error);
	}
};