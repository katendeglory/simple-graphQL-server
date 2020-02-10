const Post = require("../models/Post");
const { UserInputError, AuthenticationError } = require('apollo-server');
const utils = require('../utils');

const throwE = msg => { throw new Error(msg) };

module.exports = {
  Query: {
    getPosts: () => Post.find({}).sort({ createdAt: -1 }).then(posts => posts).catch(e => throwE(e.message)),
    getPost: (_, { _id }) => Post.findById(_id).then(post => post).catch(() => throwE('Post Not Found')),
  },
  Mutation: {
    createPost: async (_, { post }, context) => {
      try {
        const newPost = new Post({ ...post });
        const decoded = utils.verifyToken(context);
        if (!decoded) throw new AuthenticationError("The Token is Invalid");
        if (decoded.username !== newPost.username) throw new AuthenticationError("This Token belongs to another user");
        const savedPost = await newPost.save();
        return savedPost._doc;
      } catch (error) {
        throw error;
      }
    },
    deletePost: async (_, { _id }, context) => {
      try {
        const decoded = utils.verifyToken(context);
        const post = await Post.findById(_id);
        if (!post) throw new Error('Post not found');
        if (!decoded) throw new AuthenticationError("The Token is Invalid");
        if (decoded.username !== post.username) throw new AuthenticationError("Action not allowed");
        const deletedPost = await Post.deleteOne({ _id, username: decoded.username });
        return `${deletedPost.deletedCount}`;
      } catch (error) {
        throw error;
      }
    }
  }
}
