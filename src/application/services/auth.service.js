const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const config = require('../../config');

const userValidator = require('../validators/user.validator');
const UnprocessableEntityError = require('../utils/unprocessable-entity-error');

// VARIABLES

const strategyOptions = {
  issuer: config.env.server.name,
  secretOrKey: config.env.security.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// PASSPORT

passport.use(new Strategy(strategyOptions, (token, done) => {
  const errors = userValidator(token);

  if (errors) done(UnprocessableEntityError(errors));
  else {
    done(null, {
      userID: token.userID,
      userName: token.userName,
      userAge: token.userAge,
      userFamilyDependents: token.userFamilyDependents,
      userContactPhone: token.userContactPhone,
    });
  }
}));

// MIDDLEWARES

exports.initialize = passport.initialize();

exports.authorize = passport.authenticate('jwt', { session: false });
