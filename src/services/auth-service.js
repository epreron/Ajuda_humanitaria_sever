const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const jwt = require('jsonwebtoken');

const config = require('../config');

// VARIABLES

const strategyOptions = {
  issuer: config.env.server.name,
  secretOrKey: config.env.security.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// PASSPORT

passport.use(new Strategy(strategyOptions, (token, done) => {
  done(jwt.decode(token));
}));

// MIDDLEWARES

exports.initialize = passport.initialize();

exports.authorize = passport.authenticate('jwt', { session: false });
