const mongoose = require('mongoose');
const express = require('express');

const {Result} = require('./models');
const {Guess} = require('../guesses/models');
const {User} = require('../users');
const {Contestant} = require('../contestants');
const {generateResults} = require('./generateResults');
const {getScores} = require('./getLeaders');
const router = express.Router();

// this allows us to have a random week when users submit their requests; if this was live, we would just update
// the week by one each week that the show aired so that users could get real-time results
const week = Math.floor(Math.random()*10+1);

router.get('/', (req, res, next) => {
  const {username} = req.user;

  let userId, guesses, actualResults, 
    status, feedback;
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
      return Promise.all([
        Guess.findOne({userId}),
        Contestant.find(),
        Result.findOne({userId})
      ]);
    })
    .then(results => {
      guesses=results[0];
      actualResults = results[1];
      let scores = [];
      for (let i=0; i<10; i++){
        if(i<=week){
          scores.push(results[2].scores[i]);
        }else{
          scores.push('');
        }
      }
      feedback = generateResults(week, guesses, actualResults);
      return res.json({feedback, status, scores});
    })
    .catch(err => next(err));

});

//************** GET leaderboard ************/
router.get('/leaderboard', (req, res, next) => {
  const {username} = req.user;
  let results = [];
  Result.find()
    .then(results => {
      res.json(getScores(week, results));
    })
    .catch(err => next(err));
});

module.exports = {router};