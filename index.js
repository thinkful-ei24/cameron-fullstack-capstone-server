'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const {router: usersRouter} = require('./users');
const {router: contestantsRouter} = require('./contestants');
const {router: guessRouter} = require('./guesses');
const {router: resultRouter} = require('./results');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', {session: false});

app.use('/api/users', usersRouter);
app.use('/api/contestants', jwtAuth, contestantsRouter);
app.use('/api/guesses', jwtAuth, guessRouter);
app.use('/api/results', jwtAuth, resultRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  if (err.status || err.code) {
    const status = err.status || err.code;
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(status).json(errBody);
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
