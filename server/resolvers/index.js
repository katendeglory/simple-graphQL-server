module.exports = {
  Query: {
    ...require('./posts').Query,
    ...require('./users').Query,
    ...require('./comment').Query

  },
  Mutation: {
    ...require('./posts').Mutation,
    ...require('./users').Mutation,
    ...require('./comment').Mutation
  },
  Subscription: {
    ...require('./posts').Subscription
  },
  // Modifiers
  Post: {
    ...require('./posts').Post
  }
}