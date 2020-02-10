module.exports = {
  Query: {
    ...require('./posts').Query,
    ...require('./users').Query
  },
  Mutation: {
    ...require('./posts').Mutation,
    ...require('./users').Mutation
  }
}