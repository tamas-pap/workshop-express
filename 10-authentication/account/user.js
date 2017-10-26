const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName:  String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  passwordResetToken: String
});

module.exports = mongoose.model('User', userSchema);
