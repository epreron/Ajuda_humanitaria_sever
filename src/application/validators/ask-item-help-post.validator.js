const validate = require('validate.js');

module.exports = function validator(model = {}) {
  return validate(model, {
    id: {
      presence: false,
    },
    title: {
      presence: true,
    },
    postType: {
      presence: true,
    },
    date: {
      presence: true,
    },
    status: {
      presence: true,
    },
    needHelpType: {
      presence: true,
    },
    description: {
      presence: true,
    },
    String: {
      presence: true,
    },
    coordinates: {
      presence: true,
    },
    user: {
      presence: true,
    },
  });
};
