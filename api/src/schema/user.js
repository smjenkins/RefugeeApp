const { gql } = require('apollo-server-express');

exports.userSchema = gql`
  type User {
    firstName: String!
    lastName: String
    email: EmailAddress
    phone: PhoneNumber!
  }
`;
