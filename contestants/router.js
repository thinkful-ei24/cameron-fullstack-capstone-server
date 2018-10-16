const mongoose = require('mongoose');
const express = require('express');

const {Contestant} = require('./models');

const router = express.Router();

const contestants = [
  'Alex',
  'Blake',
  'Chase',
  'Chris',
  'Christian',
  'Christon',
  'Clay',
  'Colton',
  'Connor',
  'Darius',
  'David',
  'Garrett',
  'Grant',
  'Jake',
  'Jason', 
  'Jean Blanc',
  'Joe',
  'John',
  'Jordan',
  'Kamil',
  'Leo',
  'Lincoln',
  'Mike',
  'Nick',
  'Rickey',
  'Ryan',
  'Trent',
  'Wills'
];

router.get('/', (req, res, next) => {
  res.json(contestants);
});

module.exports=router;
