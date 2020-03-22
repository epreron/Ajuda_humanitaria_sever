
const errors = require('restify-errors');

module.exports = class Service {
  constructor(repository) {
    this.repository = repository;
  }

  $find(queryObject) {
    return this.repository.find(queryObject);
  }

  $findOne(queryObject) {
    return this.repository.findOne(queryObject);
  }

  $findById(id) {
    return this.repository.findById(id);
  }

  $create(payload) {
    return this.repository.create(payload);
  }

  $replace(id, payload) {
    return this.repository.replace(id, payload);
  }

  $update(id, payload) {
    return this.repository.update(id, payload);
  }

  $remove(id) {
    return this.repository.remove(id);
  }

  $findByIdOrThrowsNotFound(id) {
    return this.$findById(id)
      .then((model) => {
        if (!model) throw new errors.ResourceNotFoundError();
        return model;
      });
  }

  get() {
    return (req, res, next) => this.$find()
      .then((models) => {
        res.json(models);
        next();
      })
      .catch(next);
  }

  getById() {
    return (req, res, next) => this.$findByIdOrThrowsNotFound(req.params.id)
      .then((model) => {
        res.json(model);
        next();
      })
      .catch(next);
  }

  post() {
    return (req, res, next) => this.$create(req.body)
      .then((model) => {
        res.status(201);
        res.json(model);
        next();
      })
      .catch(next);
  }

  put() {
    return (req, res, next) => this.$findByIdOrThrowsNotFound(req.params.id)
      .then(() => this.$replace(req.params.id, req.body))
      .then((model) => {
        if (!model) throw new errors.ResourceNotFoundError();
        res.json(model);
        next();
      })
      .catch(next);
  }

  patch() {
    return (req, res, next) => this.$findByIdOrThrowsNotFound(req.params.id)
      .then(() => this.$update(req.params.id, req.body))
      .then((model) => {
        if (!model) throw new errors.ResourceNotFoundError();
        res.json(model);
        next();
      })
      .catch(next);
  }

  delete() {
    return (req, res, next) => this.$findByIdOrThrowsNotFound(req.params.id)
      .then(() => this.$remove(req.params.id, req.body))
      .then((removed) => {
        if (!removed) throw new errors.ResourceNotFoundError();
        res.send(204);
        next();
      })
      .catch(next);
  }
};
