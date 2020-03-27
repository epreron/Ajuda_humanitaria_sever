const UnprocessableEntityError = require('../../application/utils/unprocessable-entity-error');

module.exports = function bodyValidator(validator) {
  return function bodyValidatorMiddleware(req, _, next) {
    const errors = validator(req.body);
    if (!errors) next();
    else next(UnprocessableEntityError(errors));
  };
};
