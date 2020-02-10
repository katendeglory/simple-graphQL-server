//Dot Env Config
require('dotenv').config();

//Mongo Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log(`Mongo Connected`));
mongoose.connection.on('error', (error) => console.log(`Error : ${error.message}`));

//Apollo Server
const { ApolloServer } = require('apollo-server');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

//Server
const server = new ApolloServer({ typeDefs, resolvers, context: ctx => ({ req: ctx.req }) });

const port = process.env.PORT || 5000;
server.listen(port).then(({ url }) => console.log(`🚀 Server ready at ${url}`));