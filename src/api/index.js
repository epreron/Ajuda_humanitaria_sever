const { Router } = require('restify-router');

const startedDate = new Date();

const router = new Router();

router.get('/', (req, res) => {
  const { env } = req.get('config');

  res.json({
    started: startedDate,
    uptime: (new Date() - startedDate) / 1000,
    version: env.server.version,
    _links: {
    },
  });
});

module.exports = router;
