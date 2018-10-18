const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('../users');

const {JWT_EXPIRY, JWT_SECRET} = require('../config');
const router = express.Router();

const createAuthToken = function(user){
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
const jwtAuth = passport.authenticate('jwt', {session: false});

router.use(express.json());
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken({username: req.body.username});
  res.json({authToken});  
});


router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {router};