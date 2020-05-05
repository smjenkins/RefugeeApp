const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');

const { Repository } = require('./repository');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const { GraphQLServer } = require('./server');

dotenv.config();

(async function () {
  // Start GraphQL server
  const server = await GraphQLServer({
    databaseURI: process.env.DATABASE_URI,
  });

  server.listen({ port: process.env.PORT || 5000 }, (port) => {
    console.log(`Server started on http://localhost:${process.env.PORT || 5000}`);
    console.log(`GraphQL API served on http://localhost:${process.env.PORT || 5000}/graphql`);
  });
})();
