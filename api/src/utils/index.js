const jwt = require('jsonwebtoken');

exports.generateToken = async function(payload) {
  return new Promise(async (res, rej) => {
    console.log('Running promise', payload);
    jwt.sign(payload, process.env.JWT_SECRET_KEY, {}, function(err, result) {
      if (err) rej(err);
      res(result);
    });
  });
};

exports.validateToken = async function(jwt) {
  return new Promise(async (res, rej) => {
    jwt.verify(jwt, process.env.JWT_SECRET_KEY, function(err, result) {
      if (err) rej(err);
      res(result);
    });
  });
};
