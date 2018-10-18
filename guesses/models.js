const mongoose = require('mongoose');

const contestantList = [
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
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
  week1: [{type: String, enum: contestantList}],
  week2: [{type: String, enum: contestantList}],
  week3: [{type: String, enum: contestantList}],
  week4: [{type: String, enum: contestantList}],
  week5: [{type: String, enum: contestantList}],
  week6: [{type: String, enum: contestantList}],
  week7: [{type: String, enum: contestantList}],
  week8: [{type: String, enum: contestantList}],
  week9: [{type: String, enum: contestantList}],
  week10: [{type: String, enum: contestantList}]
});

schema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

const Guess = mongoose.model('Guess', schema);
module.exports = {Guess, contestantList};