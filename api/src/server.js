require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server-express');
const {
  EmailAddressResolver,
  EmailAddressTypeDefinition,
  PhoneNumberResolver,
  PhoneNumberTypeDefinition,
} = require('graphql-scalars');

// Utils
const { validateToken } = require('./utils');

// Typedefs and Resolvers
const user = require('./domains/user');

const rootTypeDef = gql`
  scalar EmailAddress
  scalar PhoneNumber
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

// Configuring graphQL server
exports.GraphqlServer = () => {
  return new ApolloServer({
    context: async ({ req }) => {
      let currentUser = null;
      if (req.headers.token) {
        currentUser = await validateToken(req.headers.token);
      }

      return { currentUser };
    },
    typeDefs: [rootTypeDef, user.typeDefs],
    resolvers: [user.resolvers],
    introspection: true,
    playground: true,
    tracing: true,
  });
};
