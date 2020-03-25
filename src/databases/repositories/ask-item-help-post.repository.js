const MongoDbRepository = require('./mongodb.repository');
const AskItemHelpPostModel = require('../models/ask-item-help-post.model');

class AskItemHelpPostRepository extends MongoDbRepository {
  constructor() {
    super('AskItemHelpPost', AskItemHelpPostModel);
  }
}

module.exports = new AskItemHelpPostRepository();
