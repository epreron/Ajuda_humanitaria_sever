module.exports = function mapUserToBody(req, res, next) {
  if (!req.body) req.body = {};
  req.body.user = req.user;
  next();
};
