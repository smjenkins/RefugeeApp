const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Loading env vars....
require('dotenv').config();

const { GraphqlServer } = require('./server');

const app = express();

app.use(cors());
app.use(express.json());

(async function() {
  console.log('Connecting to database');
  await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('Database connection has been made..');

  const graphqlServer = GraphqlServer();
  graphqlServer.applyMiddleware({ app, path: '/graphql' });
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT || 5000}`);
    console.log(`GraphQL API served on http://localhost:${process.env.PORT || 5000}/graphql`);
  });
})();
