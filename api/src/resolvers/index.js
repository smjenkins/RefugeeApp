const { userResolvers } = require('./user');

const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation
  },
};

exports.resolvers = resolvers;
