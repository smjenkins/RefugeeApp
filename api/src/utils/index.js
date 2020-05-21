const jwt = require('jsonwebtoken');

exports.generateToken = async function(payload) {
  return new Promise(async (res, rej) => {
    jwt.sign(payload, process.env.JWT_SECRET_KEY, {}, function(err, result) {
      if (err) rej(err);
      res(result);
    });
  });
};

exports.validateToken = async function(token) {
  return new Promise(async (res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, result) {
      if (err) rej(err);
      res(result);
    });
  });
};

exports.resolveUser = async ({ token }) => {
  return new Promise(async (res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, result) {
      if (err) res(null);
      res(result);
    });
  });
};

exports.authenticateUser = fn => (root, args, context, info) => {
  if (!context.currentUser) {
    throw new Error('AuthenticationFailure');
  }

  return fn(root, args, context, info);
};
