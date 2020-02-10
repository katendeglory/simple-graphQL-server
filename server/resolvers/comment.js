const { AuthenticationError, UserInputError } = require('apollo-server');
const uuid = require('uuid');

const Post = require('../models/Post');
const utils = require('../utils');

module.exports = {
  Query: {

  },
  Mutation: {
    createComment: async (_, { postID, body }, context) => {
      try {
        const decoded = utils.verifyToken(context);
        if (!decoded) throw AuthenticationError('The Token is invalid');
        if (!body) throw UserInputError('The Comment is empty');

        const postToUpdate = await Post.findById(postID);
        if (!postToUpdate) throw Error('Not Post was returned');

        const comment = { id: uuid(), username: decoded.username, body, createdAt: new Date().toISOString() }
        postToUpdate.comments.unshift(comment);
        return await postToUpdate.save();

      } catch (error) {
        throw error;
      }
    }
  }
}


//in index