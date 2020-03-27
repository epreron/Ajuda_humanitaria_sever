const { Router } = require('restify-router');

const { authorize } = require('../../application/services/auth.service');

const mapUserToBody = require('../middlewares/map-user-to-body.middleware');
const bodyValidator = require('../middlewares/body-validator.middleware');
const ignoreBodyId = require('../middlewares/ignore-body-id.middleware');

const askItemHelpPostService = require('../../application/services/ask-item-help-post.service');
const askItemHelpPostValidator = require('../../application/validators/ask-item-help-post.validator');

// ROUTES

const router = new Router();

router.post('', [
  authorize,
  ignoreBodyId,
  mapUserToBody,
  bodyValidator(askItemHelpPostValidator),
  askItemHelpPostService.post(),
]);

module.exports = router;
