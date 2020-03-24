const mongoose = require('mongoose');

const config = require('../../config');

const { Schema, model: Model } = mongoose;

module.exports = class MongoRepository {
  constructor(collection, model) {
    this.schema = new Schema(model);
    this.Model = Model(collection, this.schema);
  }

  static connect() {
    return mongoose.connect(config.env.mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  static disconnect() {
    return mongoose.disconnect();
  }

  find(queryObject) {
    return this.Model.find(queryObject);
  }

  findOne(queryObject) {
    return this.Model.findOne(queryObject);
  }

  findById(id) {
    return this.Model.findById(id);
  }

  create(payload) {
    return new this.Model(payload).save();
  }

  replace(id, payload) {
    const options = { overwrite: true };
    return this.Model.update({ _id: id }, payload, options).exec()
      .then((result) => {
        if (result.n) return this.Model.findById(id);
        return null;
      });
  }

  update(id, payload) {
    const options = { new: true };
    return this.Model.findByIdAndUpdate(id, payload, options);
  }

  remove(id) {
    return this.Model.remove({ _id: id }).exec()
      .then(({ result }) => {
        if (result.n) return true;
        return false;
      });
  }
};
