const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  scores: [{type: Number}],
  username: {type: String, required: true, unique: true}
});

schema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

const Result = mongoose.model('Result', schema);
module.exports = {Result};