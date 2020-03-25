const { Router } = require('restify-router');

const askItemHelpPostRoutes = require('./ask-item-help-post');

const startedDate = new Date();

const router = new Router();

router.get('/', (req, res) => {
  const { env } = req.get('config');
  const serverUrl = req.get('serverUrl');

  res.json({
    started: startedDate,
    uptime: (new Date() - startedDate) / 1000,
    version: env.server.version,
    _links: {
      AskItemHelpPost: `${serverUrl}/AskItemHelpPost`,
    },
  });
});

router.add('/AskItemHelpPost', askItemHelpPostRoutes);

module.exports = router;
