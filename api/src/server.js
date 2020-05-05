const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { Repository } = require('./repository');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

async function GraphQLServer({ databaseURI }) {
  const repository = await Repository.start({ databaseURI });

  // Start GraphQL server
  const server = new ApolloServer({
    context: async () => {
      return {
        repository,
      };
    },
    typeDefs,
    resolvers,
    introspection: true,
    tracing: true,
  });

  const app = express();
  server.applyMiddleware({ app });

  return app;
}

exports.GraphQLServer = GraphQLServer;
