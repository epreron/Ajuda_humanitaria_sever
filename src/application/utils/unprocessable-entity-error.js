const { UnprocessableEntityError } = require('restify-errors');

module.exports = function createUnprocessableEntityError(errors) {
  return new UnprocessableEntityError({
    toJSON() {
      return {
        code: this.code,
        messate: this.message,
        details: errors,
      };
    },
  }, 'Validation error');
}
