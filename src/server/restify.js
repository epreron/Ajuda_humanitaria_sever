const fs = require('fs');
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const api = require('../api');

module.exports = (config) => new Promise((resolve) => {
  const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: config.env.security.cors,
    allowHeaders: config.env.security.allowHeaders,
    exposeHeaders: config.env.security.exposeHeaders,
  });

  const options = {
    name: config.env.server.name,
    version: config.env.server.version,
  };

  if (config.env.security.https) {
    options.certificate = fs.readFileSync(config.env.security.cert);
    options.key = fs.readFileSync(config.env.security.key);
  }

  const server = restify.createServer(options);

  // PRE PLUGINS

  server.pre(cors.preflight);

  server.pre(restify.plugins.pre.context());

  server.pre(restify.plugins.pre.userAgentConnection({
    userAgentRegExp: /^curl.+/,
  }));

  server.pre(restify.plugins.pre.strictQueryParams({
    message: 'Url query params does not meet strict format',
  }));

  server.pre(restify.plugins.pre.dedupeSlashes());

  // PLUGINS

  server.use(cors.actual);

  server.use(restify.plugins.acceptParser(server.acceptable));

  server.use(restify.plugins.dateParser(300)); // 5 minutes

  server.use(restify.plugins.queryParser({
    allowDots: true,
  }));

  const parserOptions = { maxBodySize: 256000 };
  server.use(restify.plugins.bodyParser(parserOptions));

  server.use(restify.plugins.gzipResponse());

  server.use(restify.plugins.throttle({
    burst: 100,
    rate: 0.5,
    ip: true,
  }));

  // CONFIG MIDDLEWARE
  server.use((req, _, next) => {
    const { host } = req.headers;
    let protocol = req.isSecure() ? 'https' : 'http';
    protocol = req.headers['x-forwarded-proto'] || protocol;

    req.set('config', config);
    req.set('serverUrl', `${protocol}://${host}`);
    next();
  });

  // server.use(authService.initialize);

  // ROUTES

  api.applyRoutes(server);

  // START
  server.listen(config.env.server.port, config.env.server.host, () => {
    resolve(server);
  });
});
