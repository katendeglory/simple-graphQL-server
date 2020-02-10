const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: { type: String, default: Date() }
});


const User = mongoose.model('User', UserSchema);
module.exports = User;