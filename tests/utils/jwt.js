const jwt = require('jsonwebtoken');
const config = require('../../src/config');

module.exports = function generateJwt(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.env.security.secret, {
      issuer: config.env.server.name,
    }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};
