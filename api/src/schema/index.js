const { gql } = require('apollo-server-express');
const { userSchema } = require('./user');

const rootSchema = gql`
  scalar DateTime
  scalar Date
  scalar EmailAddress
  scalar PhoneNumber
  scalar JSONObject

  type Mutation {
    root: String
  }

  type Query {
    root: String
  }
`;

exports.typeDefs = [rootSchema, userSchema];
