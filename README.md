# Bachelorette Fantasy League Server

This is a repo for the server-side of the Bachelorette Fantasy League App, where users can make guesses about who goes home each week on the reality show, <i>The Bachelorette</i>.

## Prerequisites

This app requires Node.js v6.0+ to run.

## Installing
Install the dependencies and devDependencies and start the server.

```
npm install
```

## Running the tests

To run front-end or back-end tests, simply run `npm test` in the terminal.

## Schema

### User

```js
{
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  status: String
}
```

### Weeks

```js
{
  weekName: {
    type: String,
    required: true,
    unique: true 
    }
  contestants: [
    {
      name: String,
      photo: String
    }
  ]
}
```

### Guesses

```js
{
  userId: { 
    type: userId, 
    ref: User 
  },
  week1: [
    ContestantName
  ],
  week2: [
    ContestantName
  ],
  week3: [
    ContestantName
  ],
  week4: [
    ContestantName
  ],
  week5: [
    ContestantName
  ],
  week6: [
    ContestantName
  ],
  week7: [
    ContestantName
  ],
  week8: [
    ContestantName
  ],
  week9: [
    ContestantName
  ],
  week10: [
    ContestantName
  ]
  
}
```

### Results

```js
{
  userId: { 
    type: userId, 
    ref: User 
  },
  scores: [
    {type: Number}
  ],
  username: {
    type: String,
    required: true
  }
}
```

## API Overview

```text
/api
.
├── /auth
│   └── POST
│       ├── /login
│       └── /refresh
├── /users
│   └── POST
│       └── /
├── /contestants
│   └── GET
│       └── /
├── /guesses
│   └── POST
│       └── /
├── /results
│   └── GET
│       ├── /
│       └── /leaderboard
├── /status
│   └── GET
│       └── /
```

### POST `/api/auth/login`

```js
// req.body
{
  username: String,
  password: String
}

// res.body
{
  authToken: String
}
```

### POST `/api/auth/refresh`

```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  authToken: ${token}
}
```

### POST `/api/users/`

```js
// req.body
{
  username: String,
  password: String
}

// res.body
{
  username: String,
  id: UserId
}
```
### PUT `/api/contestants`

```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  status: String,
  results: [{
    type: String
  }]            
}
```

### POST `/api/guesses`

```js
// req.header
Authorization: Bearer ${token}
// req.body
{
  week1: [String],
  week2: [String],
  week3: [String],
  week4: [String],
  week5: [String],
  week6: [String],
  week7: [String],
  week8: [String],
  week9: [String],
  week10: [String],
}

// res.body
{
  id: UserId,
  username: String,
  status: String
}
```
### PUT `/api/results`

```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  feedback: {
    week1: [{
      name: String,
      guess: String
    }],
    week2: [{
      name: String,
      guess: String
    }],
    week3: [{
      name: String,
      guess: String
    }],
    week4: [{
      name: String,
      guess: String
    }],
    week5: [{
      name: String,
      guess: String
    }],
    week6: [{
      name: String,
      guess: String
    }],
    week7: [{
      name: String,
      guess: String
    }],
    week8: [{
      name: String,
      guess: String
    }],
    week9: [{
      name: String,
      guess: String
    }],
    week10: [{
      name: String,
      guess: String
    }],
  },
  status: String,
  scores: [Number]
}
```
### PUT `/api/results/leaderboard

```js
// req.header
Authorization: Bearer ${token}

// res.body
[{
  username: String,
  score: Number
}]

```

### GET `/api/status`

```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  status: String
}

```

## Built With

* [Node](https://nodejs.org/en/) - Run-time environment
* [Express](https://expressjs.com/) - Web application framework
* [MongoDB](https://www.mongodb.com/) - Database
* [Mongoose](https://mongoosejs.com/) - Data modeling
* [Passport](http://www.passportjs.org/docs/) - Authentication
* [JWT](https://jwt.io/) - Authentication
* [Mocha](https://mochajs.org/) - Testing 
* [Chai](https://www.chaijs.com/) - Testing

## Authors

* **Cameron Hatch** - *Full-Stack* - [CameronHatch92](https://github.com/CameronHatch92)
