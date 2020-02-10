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
    },
    deleteComment: async (_, { postID, commentID }, context) => {
      const decoded = utils.verifyToken(context);
      if (!decoded) throw AuthenticationError('The Token is invalid');

      const postToUpdate = await Post.findById(postID);
      if (!postToUpdate) throw Error('Not Post was returned');

      const commentIndex = postToUpdate.comments.findIndex(c => c.id === commentID);
      if (commentIndex === -1) throw Error('Not Comment was returned');

      if (decoded.username !== postToUpdate.comments[commentIndex].username) throw new AuthenticationError('Action Not Allowed');
      postToUpdate.comments.splice(commentIndex, 1);

      return await postToUpdate.save();
    }
  }
}