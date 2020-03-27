const validate = require('validate.js');

module.exports = function validator(model = {}) {
  return validate(model, {
    userID: {
      presence: true,
      type: 'string',
    },
    userName: {
      presence: true,
      type: 'string',
    },
    userAge: {
      presence: true,
      type: 'number',
    },
    userFamilyDependents: {
      type: 'string',
    },
    userContactPhone: {
      presence: true,
      type: 'string',
    },
  });
};
