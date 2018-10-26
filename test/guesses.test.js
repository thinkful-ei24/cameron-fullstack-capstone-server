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
        user = users.find(person => person.status === 'choosing');
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


  describe('POST /api/guesses', function () {
    it('should create guesses and send back new status', function () {
      const guesses = {
        'week1': ['Blake', 'Christon', 'Connor', 'Garrett', 'Jean Blanc', 'Kamil', 'Nick', 'Wills', 'Christian', 'David', 'Joe', 'Mike', 'Trent', 'Chris', 'Grant', 'Jordan', 'Rickey', 'Lincoln', 'John', 'Darius', 'Leo'],
        'week2': ['Connor', 'Nick', 'Mike', 'Rickey', 'Darius', 'Jordan', 'Trent', 'Christian', 'Chris', 'Wills', 'Grant', 'Kamil', 'Garrett', 'Christon', 'Joe', 'David', 'Blake', 'John'],
        'week3': ['Mike', 'Christian', 'Garrett', 'Grant', 'Jordan', 'Nick', 'Chris', 'Joe', 'Blake', 'Wills', 'Darius', 'Christon', 'Kamil', 'Trent', 'Rickey'],
        'week4': ['Christian', 'Jordan', 'Blake', 'Christon', 'Wills', 'Chris', 'Kamil', 'Joe', 'Grant', 'Trent', 'Nick', 'Garrett'],
        'week5': ['Blake', 'Chris', 'Grant', 'Garrett', 'Jordan', 'Kamil', 'Trent', 'Wills', 'Christon'],
        'week6': ['Chris', 'Jordan', 'Trent', 'Garrett', 'Grant', 'Christon'],
        'week7': ['Jordan', 'Garrett', 'Christon', 'Chris'],
        'week8': ['Garrett', 'Chris', 'Jordan'],
        'week9': ['Garrett', 'Jordan'],
        'week10': ['Garrett']
      };
      return chai.request(app)
        .post('/api/guesses')
        .set('Authorization', `Bearer ${token}`)
        .send(guesses)
        .then((res) => {
          expect(res.body).to.have.all.keys('username', 'status', 'id');
          expect(res.body.status).to.equal('results');
          expect(res).to.have.status(201);
          return Result.findOne({ userId: user.id });
        })
        .then(res => {
          expect(res.scores).to.have.lengthOf(10);
          expect(res.scores[0]).to.be.greaterThan(0);
          return User.findOne({ username: user.username });
        })
        .then(res => {
          expect(res.status).to.equal('results');
        });
    });


    it('should return error when given bad contestant', function () {
      const guesses = {
        'week1': ['Blake', 'Christon', 'Connor', 'Garrett', 'Jean Blanc', 'Kamil', 'Nick', 'Wills', 'Christian', 'David', 'Joe', 'Mike', 'Trent', 'Chris', 'Grant', 'Jordan', 'Rickey', 'Lincoln', 'John', 'Darius', 'Leo'],
        'week2': ['Connor', 'Nick', 'Mike', 'Rickey', 'Darius', 'Jordan', 'Trent', 'Christian', 'Chris', 'Wills', 'Grant', 'Kamil', 'Garrett', 'Christon', 'Joe', 'David', 'Blake', 'John'],
        'week3': ['Mike', 'Christian', 'Garrett', 'Grant', 'Jordan', 'Nick', 'Chris', 'Joe', 'Blake', 'Wills', 'Darius', 'Christon', 'Kamil', 'Trent', 'Rickey'],
        'week4': ['Christian', 'Jordan', 'Blake', 'Christon', 'Wills', 'Chris', 'Kamil', 'Joe', 'Grant', 'Trent', 'Nick', 'Garrett'],
        'week5': ['Blake', 'Chris', 'Grant', 'Garrett', 'Jordan', 'Kamil', 'Trent', 'Wills', 'Christon'],
        'week6': ['Chris', 'Jordan', 'Trent', 'Garrett', 'Grant', 'Christon'],
        'week7': ['Jordan', 'Garrett', 'Christon', 'Chris'],
        'week8': ['Garrett', 'Chris', 'Jordan'],
        'week9': ['Garrett', 'Jordan'],
        'week10': ['Chris']
      };
      return chai.request(app)
        .post('/api/guesses')
        .set('Authorization', `Bearer ${token}`)
        .send(guesses)
        .then((res) => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Contestant choice must also be chosen in previous week');
          return Result.findOne({ userId: user.id });
        })
        .then(res => {
          expect(res).to.be.null;
        });
    });

    it('should return error when given wrong number of contestants', function () {
      const guesses = {
        'week1': ['Blake', 'Christon', 'Connor', 'Garrett', 'Jean Blanc', 'Kamil', 'Nick', 'Wills', 'Christian', 'David', 'Joe', 'Mike', 'Trent', 'Chris', 'Grant', 'Jordan', 'Rickey', 'Lincoln', 'John', 'Darius', 'Leo'],
        'week2': ['Connor', 'Nick', 'Mike', 'Rickey', 'Darius', 'Jordan', 'Trent', 'Christian', 'Chris', 'Wills', 'Grant', 'Kamil', 'Garrett', 'Christon', 'Joe', 'David', 'Blake', 'John'],
        'week3': ['Mike', 'Christian', 'Garrett', 'Grant', 'Jordan', 'Nick', 'Chris', 'Joe', 'Blake', 'Wills', 'Darius', 'Christon', 'Kamil', 'Trent', 'Rickey'],
        'week4': ['Christian', 'Jordan', 'Blake', 'Christon', 'Wills', 'Chris', 'Kamil', 'Joe', 'Grant', 'Trent', 'Nick', 'Garrett'],
        'week5': ['Blake', 'Chris', 'Grant', 'Garrett', 'Jordan', 'Kamil', 'Trent', 'Wills', 'Christon'],
        'week6': ['Chris', 'Jordan', 'Trent', 'Garrett', 'Grant', 'Christon'],
        'week7': ['Jordan', 'Garrett', 'Christon', 'Chris'],
        'week8': ['Garrett', 'Chris', 'Jordan'],
        'week9': ['Garrett', 'Jordan', 'Chris'],
        'week10': ['Garrett']
      };
      return chai.request(app)
        .post('/api/guesses')
        .set('Authorization', `Bearer ${token}`)
        .send(guesses)
        .then((res) => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Invalid number of contestants chosen');
          return Result.findOne({ userId: user.id });
        })
        .then(res => {
          expect(res).to.be.null;
        });
    });

    it('should return error when given duplicate contestants', function () {
      const guesses = {
        'week1': ['Blake', 'Christon', 'Connor', 'Garrett', 'Jean Blanc', 'Kamil', 'Nick', 'Wills', 'Christian', 'David', 'Joe', 'Mike', 'Trent', 'Chris', 'Grant', 'Jordan', 'Rickey', 'Lincoln', 'John', 'Darius', 'Leo'],
        'week2': ['Connor', 'Nick', 'Mike', 'Rickey', 'Darius', 'Jordan', 'Trent', 'Christian', 'Chris', 'Wills', 'Grant', 'Kamil', 'Garrett', 'Christon', 'Joe', 'David', 'Blake', 'John'],
        'week3': ['Mike', 'Christian', 'Garrett', 'Grant', 'Jordan', 'Nick', 'Chris', 'Joe', 'Blake', 'Wills', 'Darius', 'Christon', 'Kamil', 'Trent', 'Rickey'],
        'week4': ['Christian', 'Jordan', 'Blake', 'Christon', 'Wills', 'Chris', 'Kamil', 'Joe', 'Grant', 'Trent', 'Nick', 'Garrett'],
        'week5': ['Blake', 'Chris', 'Grant', 'Garrett', 'Jordan', 'Kamil', 'Trent', 'Wills', 'Christon'],
        'week6': ['Chris', 'Jordan', 'Trent', 'Garrett', 'Grant', 'Christon'],
        'week7': ['Jordan', 'Garrett', 'Christon', 'Chris'],
        'week8': ['Garrett', 'Chris', 'Jordan'],
        'week9': ['Garrett', 'Garrett'],
        'week10': ['Garrett']
      };
      return chai.request(app)
        .post('/api/guesses')
        .set('Authorization', `Bearer ${token}`)
        .send(guesses)
        .then((res) => {
          expect(res).to.have.status(422);
          expect(res.body.message).to.equal('Cannot have duplicate contestants in one week');
          return Result.findOne({ userId: user.id });
        })
        .then(res => {
          expect(res).to.be.null;
        });
    });

    it('should return an error is user status is not choosing', function () {
      const guesses = {
        'week1': ['Blake', 'Christon', 'Connor', 'Garrett', 'Jean Blanc', 'Kamil', 'Nick', 'Wills', 'Christian', 'David', 'Joe', 'Mike', 'Trent', 'Chris', 'Grant', 'Jordan', 'Rickey', 'Lincoln', 'John', 'Darius', 'Leo'],
        'week2': ['Connor', 'Nick', 'Mike', 'Rickey', 'Darius', 'Jordan', 'Trent', 'Christian', 'Chris', 'Wills', 'Grant', 'Kamil', 'Garrett', 'Christon', 'Joe', 'David', 'Blake', 'John'],
        'week3': ['Mike', 'Christian', 'Garrett', 'Grant', 'Jordan', 'Nick', 'Chris', 'Joe', 'Blake', 'Wills', 'Darius', 'Christon', 'Kamil', 'Trent', 'Rickey'],
        'week4': ['Christian', 'Jordan', 'Blake', 'Christon', 'Wills', 'Chris', 'Kamil', 'Joe', 'Grant', 'Trent', 'Nick', 'Garrett'],
        'week5': ['Blake', 'Chris', 'Grant', 'Garrett', 'Jordan', 'Kamil', 'Trent', 'Wills', 'Christon'],
        'week6': ['Chris', 'Jordan', 'Trent', 'Garrett', 'Grant', 'Christon'],
        'week7': ['Jordan', 'Garrett', 'Christon', 'Chris'],
        'week8': ['Garrett', 'Chris', 'Jordan'],
        'week9': ['Garrett', 'Jordan'],
        'week10': ['Garrett']
      };
      return User.findOneAndUpdate({ username: user.username }, { status: 'results' }, { new: true })
        .then(() => {
          return chai.request(app)
            .post('/api/guesses')
            .set('Authorization', `Bearer ${token}`)
            .send(guesses);
        })
        .then((res) => {
          expect(res.body.message).to.equal('You have already submitted your guesses');
          expect(res).to.have.status(422);
          return Result.findOne({ userId: user.id });
        })
        .then(res => {
          expect(res).to.be.null;
        });
    });
  });

});