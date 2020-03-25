const { UnprocessableEntityError } = require('restify-errors');

module.exports = function bodyValidator(validator) {
  return function bodyValidatorMiddleware(req, _, next) {
    const validationErrors = validator(req.body);
    if (!validationErrors) next();
    else {
      next(new UnprocessableEntityError({
        toJSON() {
          return {
            code: this.code,
            messate: this.message,
            details: validationErrors,
          };
        },
      }, 'Validation error'));
    }
  };
};
