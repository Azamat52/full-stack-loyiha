const { body } = require("express-validator")

exports.postCreateValidator = [
	body("title")
		.notEmpty()
		.withMessage("Title is required")
		.bail()
		.isLength({ min: 5 })
		.withMessage("Title must be 5 characters at least"),

	body("body")
		.notEmpty()
		.withMessage("Body is required"),

	body("description")
		.notEmpty()
		.withMessage("Description is required")
		.bail()
		.isLength({ min: 16 })
		.withMessage("Description must be 16 characters at least"),
]