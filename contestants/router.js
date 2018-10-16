const mongoose = require('mongoose');
const express = require('express');

const {Contestant} = require('./models');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {

  Contestant.find()
    .then(results => {
      return results.map(contestant => contestant.name);
    })
    .then(results => res.json(results))
    .catch(err => next(err));
});

module.exports={router};
