const mongoose = require('mongoose');

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
const schema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  week1: [{type: String, enum: contestants}],
  week2: [{type: String, enum: contestants}],
  week3: [{type: String, enum: contestants}],
  week4: [{type: String, enum: contestants}],
  week5: [{type: String, enum: contestants}],
  week6: [{type: String, enum: contestants}],
  week7: [{type: String, enum: contestants}],
  week8: [{type: String, enum: contestants}],
  week9: [{type: String, enum: contestants}],
  week10: [{type: String, enum: contestants}]
});

schema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

const Guess = mongoose.model('Guess', schema);
module.exports = {Guess};