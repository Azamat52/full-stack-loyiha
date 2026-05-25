const { body, validationResult } = require("express-validator")
const BaseError = require('../errors/base-error')

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(BaseError.BadRequest("Error with validation", errors.array()))
  }
  next()
};


module.exports = validate