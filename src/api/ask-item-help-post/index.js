const { Router } = require('restify-router');

const { authorize } = require('../../application/services/auth.service');
const mapUserToBody = require('../utils/map-user-to-body.middleware');
const bodyValidator = require('../utils/body-validator.middleware');

const askItemHelpPostService = require('../../application/services/ask-item-help-post.service');
const askItemHelpPostValidator = require('../../application/validators/ask-item-help-post.validator');

// ROUTES

const router = new Router();

router.post('', [
  authorize,
  mapUserToBody,
  bodyValidator(askItemHelpPostValidator),
  askItemHelpPostService.post(),
]);

module.exports = router;
