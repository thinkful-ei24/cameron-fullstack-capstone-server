'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');
const { dbConnect, dbDisconnect } = require('../db-mongoose');

const { Contestant } = require('../contestants');
const { User } = require('../users');
const { Guess } = require('../guesses');
const { Result } = require('../results');
const { app } = require('../index');

const { users} = require('./test-data');

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
process.stdout.write('\x1Bc\n');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Bachelor test contestants', function () {
  const username = 'exampleUser';
  const password = 'examplePass';

  before(function () {
    return dbConnect(TEST_DATABASE_URL)
      .then(() => Promise.all([
        User.deleteMany()
      ]));
  });

  beforeEach(function () {
    return Promise.all([
      User.insertMany(users),
    ]);
  });

  afterEach(function () {
    return Promise.all([
      Contestant.deleteMany(),
      User.deleteMany(),
      Guess.deleteMany(),
      Result.deleteMany()
    ]);
  });

  after(function () {
    return dbDisconnect();
  });

  describe('/api/users', function () {
    describe('POST', function () {
      it('Should create a new user', function () {
        const testUser = { username, password };

        let res;
        return chai
          .request(app)
          .post('/api/users')
          .send(testUser)
          .then(_res => {
            res = _res;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys('id', 'username', 'status');

            expect(res.body.id).to.exist;
            expect(res.body.username).to.equal(testUser.username);
            expect(res.body.fullname).to.equal(testUser.fullname);

            return User.findOne({ username });
          })
          .then(user => {
            expect(user).to.exist;
            expect(user.id).to.equal(res.body.id);
            return user.validatePassword(password);
          })
          .then(isValid => {
            expect(isValid).to.be.true;
          });
      });
      it('Should reject users with missing username', function () {
        const testUser = { password };
        return chai.request(app).post('/api/users').send(testUser)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Missing username');
          });
      });

      it('Should reject users with missing password', function () {
        const testUser = { username };
        return chai.request(app).post('/api/users').send(testUser)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Missing password');
          });
      });

      it('Should reject users with non-string username', function () {
        const badUsername = 1234;
        const testUser = { username: badUsername, password };
        return chai.request(app).post('/api/users').send(testUser)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Incorrect field type for username: expected string');
          });
      });

      it('Should reject users with non-string password', function () {
        const badPassword = 1234;
        const testUser = { username, password: badPassword };
        return chai.request(app).post('/api/users').send(testUser)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Incorrect field type for password: expected string');
          });
      });

      it('Should reject users with non-trimmed username', function () {
        const badUsername = ' Bob';
        const testUser = { username: badUsername, password };
        return chai.request(app).post('/api/users').send(testUser)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Cannot start or end with whitespace');
          });
      });

      it('Should reject users with non-trimmed password', function () {
        const badPassword = '1234word ';
        const testUser = { username, password: badPassword };
        return chai.request(app).post('/api/users').send(testUser)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Cannot start or end with whitespace');
          });
      });

      it('Should reject users with empty username', function () {
        const badUsername = 'a';
        const testUser = { username: badUsername, password };
        return chai.request(app).post('/api/users').send(testUser)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Must be at least 2 characters long');
          });
      });

      it('Should reject users with password less than 8 characters', function () {
        const badPassword = 'abcd';
        const testUser = { username, password: badPassword };
        return chai.request(app).post('/api/users').send(testUser)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Must be at least 8 characters long');
          });
      });

      it('Should reject users with password greater than 72 characters', function () {
        const badPassword = '12345678901234567890123456789012345678901234567890123456789012345678901234';
        const testUser = { username, password: badPassword };
        return chai.request(app).post('/api/users').send(testUser)
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Must be at most 72 characters long');
          });
      });

      it('Should reject users with duplicate username', function () {
        const testUser = { username, password };
        return chai.request(app).post('/api/users').send(testUser)
          .then(() => {
            return chai.request(app).post('/api/users').send(testUser);
          })
          .then(res => {
            expect(res).to.have.status(422);
            expect(res.body.message).to.equal('Username already exists');
          });
      });
    });
  });
});