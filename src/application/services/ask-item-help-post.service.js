const Service = require('./base.service');
const repository = require('../../databases/repositories/ask-item-help-post.repository');

class AskItemHelpPostService extends Service {
  constructor() {
    super(repository);
  }
}

module.exports = new AskItemHelpPostService();
