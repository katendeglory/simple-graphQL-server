const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  body: String,
  createdAt: { type: String, default: new Date().toISOString() },
  comments: [
    {
      body: String,
      username: String,
      createdAt: { type: String, default: new Date().toISOString() }
    }
  ],
  likes: [
    {
      username: String,
      createdAt: { type: String, default: new Date().toISOString() }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

const User = mongoose.model('Post', UserSchema);
module.exports = User;