const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    firstName: String
    lastName: String
    email: EmailAddress
    phone: PhoneNumber!
  }

  type LoginUserOutput {
    success: Boolean!
    message: String!
  }

  type VerifyUserOutput {
    user: User!
    newUser: Boolean!
    token: String!
  }

  input editUserProfileInput {
    firstName: String
    lastName: String
    email: EmailAddress
  }

  extend type Mutation {
    loginUser(phone: PhoneNumber!): LoginUserOutput!
    verifyUser(phone: PhoneNumber!, code: String!): VerifyUserOutput!
    editUserProfile(input: editUserProfileInput): User!
  }

  extend type Query {
    userProfile: User!
  }
`;
