const mongoose = require('mongoose');
const express = require('express');

const {Result} = require('./models');
const {User} = require('../users');
const router = express.Router();

router.get('/', (req, res, next) => {
  const {username, status} = req.user;
  const {week} = req.body;
  if(!week){
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing week number',
      location: 'week'
    });
  }
  if(status !== 'results'){
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Please make your selection first',
      location: 'status'
    });
  }
});

module.exports = {router};