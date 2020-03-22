const path = require('path');
const packageJson = require('../../package.json');

function arrayFromEnv(env) {
  return (env || '').split(/ *[,|;] */);
}

module.exports = {
  server: {
    name: process.env.SERVER_NOME || packageJson.name,
    version: process.env.SERVER_VERSION || packageJson.version,
    port: process.env.PORT || process.env.SERVER_PORT || 3000,
    host: process.env.HOST || process.env.SERVER_HOST || 'localhost',
  },
  security: {
    cors: arrayFromEnv(process.env.SECURITY_CORS),
    allowHeaders: arrayFromEnv(process.env.SECURITY_ALLOW_HEADERS),
    exposeHeaders: arrayFromEnv(process.env.SECURITY_EXPOSE_HEADERS),
    https: Boolean(process.env.SECURITY_HTTPS) || false,
    cert: process.env.SECURITY_CERT || path.resolve(__dirname, 'https/cert.pem'),
    key: process.env.SECURITY_KEY || path.resolve(__dirname, 'https/key.pem'),
    secret: process.env.SECURITY_SECRET || '83cce6c36d76689b180297fe705fcae8', // md5(sha1('ajuda-coletiva-api'))
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
};
