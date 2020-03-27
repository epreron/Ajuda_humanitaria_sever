const config = require('./config');
const restify = require('./server/restify');

exports.server = restify;
exports.config = config;

if (!module.parent) {
  restify(config)
    .then((server) => {
      console.log('%s listening at %s', server.name, server.url); // eslint-disable-line
    })
    .catch(() => {
      process.exit(1);
    });
}
