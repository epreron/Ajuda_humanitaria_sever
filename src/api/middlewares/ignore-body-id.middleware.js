module.exports = function ignoreBodyId(req, res, next) {
  if (req.body.id) req.body.id = undefined;
  next();
};
