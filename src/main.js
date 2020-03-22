const config = require('./config');
const restify = require('./server/restify');

restify(config)
  .then((server) => {
    console.log('%s listening at %s', server.name, server.url); // eslint-disable-line
  });
