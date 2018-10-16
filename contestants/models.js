const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  photo: String,
  weekEliminated: String
});

schema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});


module.exports = mongoose.model('Contestant', schema);

