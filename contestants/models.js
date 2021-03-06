const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  weekName: {type: String, required: true, unique: true},
  contestants: [{type: mongoose.Schema.Types.Mixed}]
});

schema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

const Contestant = mongoose.model('Contestant', schema);
module.exports = {Contestant};

