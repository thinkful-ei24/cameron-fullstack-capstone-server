const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  status: {type: String, default: 'choosing', required: true}
});

schema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
  }
});

schema.methods.validatePassword = function(password){
  return bcrypt.compare(password, this.password);
};

schema.statics.hashPassword = function(password){
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', schema);
module.exports = {User};

