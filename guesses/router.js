const mongoose = require('mongoose');
const express = require('express');

const {Guess, contestantList} = require('./models');
const {User} = require('../users/models');
const {Contestant} = require('../contestants');
const {Result} = require('../results'); 
const {generateScoreArray} = require('../results/getScores');

const router = express.Router();

const remainingContestants = [21, 18, 15, 12, 9, 6, 4, 3, 2, 1];

router.use(express.json());

router.post('/', (req, res, next) => {
  const requiredFields=[];
  for(let i=1; i<=10; i++) {
    requiredFields.push(`week${i}`);
  }
  const missingField = requiredFields.find(field => !(field in req.body));

  if(missingField){
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: `Missing ${missingField}`,
      location: missingField
    });
  }
 
  const invalidContestant = req.body.week1.find(
    person => !(contestantList.includes(person))
  );

  if(invalidContestant){
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Invalid Contestant',
      location: 'week0'
    });
  }
  
  let invalidChoice;
  let problemWeek;
  for(let i=1; i<10; i++){
    let currentWeek = req.body[requiredFields[i]];
    let previousWeek = req.body[requiredFields[i-1]];
    invalidChoice = currentWeek.find(
      person => !(previousWeek.includes(person))
    );
    if(invalidChoice){
      problemWeek = `week${i+1}`;
      break;
    }
  }

  if(invalidChoice){
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Contestant choice must also be chosen in previous week',
      location: problemWeek
    });
  }
  
  let wrongNumberContestants;
  for(let i=1; i<=10; i++){
    if(req.body[`week${i}`].length !== remainingContestants[i-1]){
      wrongNumberContestants = `week${i}`;
      break;
    }
  }

  if(wrongNumberContestants){
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Invalid number of contestants chosen',
      location: wrongNumberContestants
    });
  }

  let duplicateContestants;
  for(let i=1; i<=10; i++){
    if((new Set(req.body[`week${i}`])).size !== req.body[`week${i}`].length){
      duplicateContestants = `week${i}`;
      break;
    }
  }

  if(duplicateContestants){
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot have duplicate contestants in one week',
      location: duplicateContestants
    });
  }

  const {username} = req.user;
  const {week1, week2, week3, week4, week5, 
    week6, week7, week8, week9, week10} = req.body;
  
  let userId, newData, actualResults;

  return User.find({username})
    .then(([user]) => {
      if (!user){
        return Promise.reject({
          code: 401,
          message: 'User not authorized to perform this action',
          location: 'username'
        });
      } else if(user.status !=='choosing'){
        return Promise.reject({
          code: 401,
          message: 'You have already submitted your guesses',
          location: 'status'
        });
      }
      userId=user.id;
      return userId;
    })
    .then(() => {
      return Contestant.find();
    })
    .then((results) => {
      actualResults = results;
      newData = {
        userId,
        week1, week2, week3, week4, week5,
        week6, week7, week8, week9, week10
      };
      const scores = {userId, username, scores: generateScoreArray(newData, actualResults)};
      return Promise.all([
        Guess.create(newData), 
        User.findOneAndUpdate({username}, {status: 'results'},{new: true}),
        Result.create(scores)
      ]);
    })
    .then(result => {
      res.status(201)
        .json(result[1]);
    })
    .catch(err => next(err)); 

});

module.exports = {router};