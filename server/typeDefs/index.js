const gql = require('graphql-tag');

module.exports = gql`
  # Types------------------------------------------------------------------------------------------
  type Post{
    _id: ID!
    username: String!
    body: String!
    createdAt: String!
  }

  input PostInput{
    username: String!
    body: String!
  }

  type User{
    _id: ID!
    username: String!
    password: String!
    email: String!
    createdAt: String!
    token: String!
  }

  input UserInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }


  # Queries and Mutations---------------------------------------------------------------------------
  type Query{
    # Posts
    getPosts: [Post] 
    getPost(_id: ID!): Post
    # User
    login(username: String!, password: String!) : User
  }

  type Mutation{
    # User
    register(user: UserInput!) : User
    # Posts
    createPost(post: PostInput!): Post
    deletePost(_id: ID!): String
  }
`;