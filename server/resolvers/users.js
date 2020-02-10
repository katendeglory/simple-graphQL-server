const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');

//utils
const utils = require('../utils');

module.exports = {
  Query: {
    login: async (parent, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      if (!user) throw new UserInputError('The User was not found');
      if (!await bcrypt.compare(password, user.password)) throw new UserInputError('Incorrect Password');
      const token = utils.generateToken(user);
      return { ...user._doc, token }
    }
  },
  Mutation: {
    register: async (parent, args) => {
      const { user } = args;
      try {
        const found = await User.findOne({ username: user.username });
        if (found) throw new UserInputError("Username is taken");
        user.password = await bcrypt.hash(user.password, 12);
        const savedUser = await new User({ ...user }).save();
        const token = utils.generateToken(user);
        return { ...savedUser._doc, token };
      } catch (error) {
        throw error;
      }
    }
  }
}