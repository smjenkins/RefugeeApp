const { loginUser, verifyUser, editUserProfile, getUserProfile } = require('./actions');
const { authenticateUser } = require('../../utils');

module.exports = {
  Mutation: {
    loginUser: async (_, args) => loginUser(args),
    verifyUser: async (_, args) => verifyUser(args),
    editUserProfile: authenticateUser(async (_, args, { currentUser }) =>
      editUserProfile({
        userUUID: currentUser._id,
        ...args.input,
      }),
    ),
  },

  Query: {
    userProfile: authenticateUser(async (_, args, { currentUser }) => {
      return getUserProfile({ userUUID: currentUser._id });
    }),
  },
};
