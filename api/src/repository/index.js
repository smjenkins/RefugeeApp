/*
This module loads all models, handles connection to the database
 and exposes everything as an ORM
 */
const mongoose = require('mongoose');
const { buildORMFromModel } = require('./buildORMFromModel');

// Models
const { UserModel } = require('./models/User');

async function startRepository({ databaseURI }) {
  try {
    await mongoose.connect(databaseURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (e) {
    throw new Error(e);
  }

  return {
    user: buildORMFromModel(UserModel),
  };
}

exports.Repository = {
  start: startRepository,
};
