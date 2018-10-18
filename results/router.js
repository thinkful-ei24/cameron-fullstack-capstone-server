const mongoose = require('mongoose');
const express = require('express');

const {Result} = require('./models');
const {Guess} = require('../guesses');
const {User} = require('../users');
const {Contestant} = require('../contestants');
const {generateResults} = require('./generateResults');
const router = express.Router();

router.get('/', (req, res, next) => {
  const {username} = req.user;
  const week = Math.floor(Math.random()*10+1);

  let userId, guesses, actualResults, status;

  User.findOne({username})
    .then(result => {
      userId = result.id;
      status = result.status;
      if(status !== 'results'){
        return res.status(422).json({
          code: 422,
          reason: 'ValidationError',
          message: 'Please make your selection first',
          location: 'status'
        });
      }
      return userId;
    })
    .then(() => {
      return Guess.findOne({userId});
    })
    .then(result => {
      guesses=result;
      return Contestant.find();
    })
    .then(results => {
      actualResults = results;
      const feedback = generateResults(week, guesses, actualResults);
      res.json({feedback, status});
    })
    .catch(err => next(err));

});

module.exports = {router};