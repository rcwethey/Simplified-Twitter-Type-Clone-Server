const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const MONGODBPATH = "mongodb+srv://r_wethey:GxAL5prPMc5AgY7d@cluster0.rwlnd.mongodb.net/genericBackend?retryWrites=true&w=majority";
const typeDefs = require('./GraphQL/typeDefs');
const resolvers = require('./GraphQL/resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});


mongoose.connect(MONGODBPATH, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({port: 3001})
  })
  .then(res => {
    console.log(`Server Running @ ${res.url}`)
  });