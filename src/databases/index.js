const MongodbRepository = require('./repositories/mongodb.repository');

exports.connect = async function connectRepositories() {
  await MongodbRepository.connect();
};

exports.disconnect = async function disconnectRepositories() {
  await MongodbRepository.disconnect();
};
