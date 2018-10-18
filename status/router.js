const mongoose = require('mongoose');
const express = require('express');

const {User} = require('../users');

const router = express.Router();

router.get('/', (req, res, next) => {
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
      res.json(user.status);
    })
    .catch(err => next(err));
});

module.exports = {router};