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

const { week0, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10 } = require('../contestants/seedData');
const { users, guesses, results } = require('./test-data');

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
process.stdout.write('\x1Bc\n');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Bachelor test contestants', function () {
  let user;
  let token;
  before(function () {
    return dbConnect(TEST_DATABASE_URL)
      .then(() => Promise.all([
        Contestant.deleteMany(),
        User.deleteMany(),
        Guess.deleteMany(),
        Result.deleteMany()
      ]));
  });

  beforeEach(function () {
    return Promise.all([
      Contestant.insertMany([week0, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10]),
      User.insertMany(users),
      Guess.insertMany(guesses),
      Result.insertMany(results)
    ])
      .then(([contestant, users]) => {
        user = users.find(person => person.status === 'results');
        token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
      });
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


  describe('GET /api/results', function () {
    it('should create guesses and send back new status', function () {

      return chai.request(app)
        .get('/api/results')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.body).to.have.all.keys('status', 'scores', 'feedback');
          expect(res.body.status).to.equal('results');
          expect(res).to.have.status(200);
          expect(res.body.scores).to.have.length(10);
          return User.findOne({ username: user.username });
        })
        .then(res => {
          expect(res.status).to.equal('results');
        });
    });

    it('should return error is user has wrong status', function () {
      return User.findOneAndUpdate({ username: user.username }, { status: 'choosing' }, { new: true })
        .then(() => {
          return chai.request(app)
            .get('/api/results')
            .set('Authorization', `Bearer ${token}`);
        })
        .then((res) => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Please make your selection first');
        });
    });


  });

  describe('GET /api/results/leaderboard', function () {
    it('should create guesses and send back new status', function () {

      return chai.request(app)
        .get('/api/results/leaderboard')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.body).to.have.length(2);
          expect(res).to.have.status(200);
          res.body.forEach(person => {
            expect(person).to.have.all.keys('username', 'score');
          });
          expect(res.body[0].score).to.be.gte(res.body[1].score);
        });
    });

  });


});

