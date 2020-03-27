const request = require('supertest');

const { server, config } = require('../src/main');
const jwt = require('./utils/jwt');

describe('Ask Item Help Post', () => {
  before(async () => {
    this.server = await server(config);
    this.authorization = await jwt({
      userID: '123',
      userName: 'Foo Bar',
      userAge: '60',
      userFamilyDependents: '?',
      userContactPhone: '55+ (14) 98186-0123',
    });
  });

  it('Create', (done) => {
    request(this.server)
      .post('/AskItemHelpPost')
      .set('Authorization', `Bearer ${this.authorization}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(201, {}, done);
  });

  after(async () => {
    await this.server.close();
  });
});
