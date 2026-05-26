const { body } = require("express-validator")

exports.registerValidator = [
	body("username")
		.notEmpty()
		.withMessage("Username is required")
		.bail()
		.isLength({ min: 3, max: 20 })
		.withMessage("Username must be 3-20 characters"),

	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.bail()
		.isEmail()
		.withMessage("Email is invalid"),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.bail()
		.isLength({ min: 4, max: 16 })
		.withMessage("Password must be 4-16 characters"),

	// body("confirmPassword")
	// 	.custom((value, { req }) => {
	// 		if (value !== req.body.password) {
	// 			throw new Error("Passwords do not match")
	// 		}
	// 		return true
	// 	}),
]

exports.loginValidator = [
	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.bail()
		.isEmail()
		.withMessage("Email is invalid"),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.bail()
		.isLength({ min: 8, max: 25 })
		.withMessage("Password must be 8-25 characters"),
]