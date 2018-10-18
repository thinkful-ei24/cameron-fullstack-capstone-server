const mongoose = require('mongoose');
const express = require('express');

const {Contestant} = require('./models');
const {User} = require('../users');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res, next) => {
  let status;
  const {username} = req.user;
  User.findOne({username})
    .then(user => {
      if(!user){
        return Promise.reject({
          code: 401,
          message: 'User not authorized to perform this action',
          location: 'username'
        });
      }
      status=user.status;
      return status;
    })
    .then(() => {
      return Contestant.findOne({weekName: 'week0'});
    })
    .then(results => {
      return results.contestants.map(contestant => contestant.name);
    })
    .then(results => res.json({results, status}))
    .catch(err => next(err));
});

module.exports={router};
