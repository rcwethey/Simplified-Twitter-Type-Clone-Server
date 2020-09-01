const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const { MONGODBPATH } = require('./config');
const typeDefs = require('./GraphQL/typeDefs');
const resolvers = require('./GraphQL/resolvers');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose.connect(MONGODBPATH, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({port: PORT})
  })
  .then(res => {
    console.log(`Server Running @ ${res.url}`)
  });