const mongoose = require('mongoose');
const express = require('express');

const {Contestant} = require('./models');
const {User} = require('../users');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {
  Contestant.findOne({weekName: 'week0'})
    .then(results => {
      console.log(results);
      return results.contestants.map(contestant => contestant.name);
    })
    .then(results => res.json(results))
    .catch(err => next(err));
});

module.exports={router};
