const { loginUser, verifyUser } = require('./actions');

module.exports = {
  Mutation: {
    loginUser: async (_, args) => loginUser(args),
    verifyUser: async (_, args) => verifyUser(args),
  },
};
