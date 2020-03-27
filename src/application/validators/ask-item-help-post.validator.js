const validate = require('validate.js');

module.exports = function validator(model = {}) {
  return validate(model, {
    id: {
      presence: false,
    },
    title: {
      type: 'string',
      presence: {
        allowEmpty: false,
      },
    },
    postType: {
      type: 'string',
      presence: {
        allowEmpty: false,
      },
    },
    date: {
      type: 'date',
      presence: {
        allowEmpty: false,
      },
    },
    status: {
      type: 'string',
    },
    needHelpType: {
      type: 'string',
      presence: {
        allowEmpty: false,
      },
    },
    description: {
      type: 'string',
    },
    itensNeeded: {
      type: 'array',
      presence: true,
    },
    coordinates: {
      type: 'array',
      presence: {
        allowEmpty: false,
      },
    },
    user: {
      presence: {
        allowEmpty: false,
      },
    },
  });
};
