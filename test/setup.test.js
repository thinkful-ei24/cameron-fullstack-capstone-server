// 'use strict';

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const jwt = require('jsonwebtoken');

// const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');
// const { dbConnect, dbDisconnect } = require('../db-mongoose');

// const { Contestant } = require('../contestants');
// const { User } = require('../users');
// const { Guess } = require('../guesses');
// const { Result } = require('../results');

// const { week0, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10 } = require('../contestants/seedData');
// const { users, guesses, results } = require('./test-data');

// // Set NODE_ENV to `test` to disable http layer logs
// // You can do this in the command line, but this is cross-platform
// process.env.NODE_ENV = 'test';

// // Clear the console before each run
// process.stdout.write('\x1Bc\n');

// const expect = chai.expect;
// chai.use(chaiHttp);

// let user;
// let token;

// before(function () {
//   return dbConnect(TEST_DATABASE_URL)
//     .then(() => Promise.all([
//       Contestant.deleteMany(),
//       User.deleteMany(),
//       Guess.deleteMany(),
//       Result.deleteMany()
//     ]));
// });

// beforeEach(function () {
//   return Promise.all([
//     Contestant.insertMany([week0, week1, week2, week3, week4, week5, week6, week7, week8, week9, week10]),
//     User.insertMany(users),
//     Guess.insertMany(guesses),
//     Result.insertMany(results)
//   ])
//     .then(([users]) => {
//       user = users[0];
//       token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
//     });
// });

// afterEach(function (){
//   return Promise.all([
//     Contestant.deleteMany(),
//     User.deleteMany(),
//     Guess.deleteMany(),
//     Result.deleteMany()
//   ]);
// });

// after(function () {
//   return dbDisconnect();
// });

// describe('Mocha and Chai', function () {
//   it('should be properly setup', function () {
//     expect(true).to.be.true;
//   });
// });
