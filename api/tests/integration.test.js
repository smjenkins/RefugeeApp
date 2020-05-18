const MongoMemoryServer = require('mongodb-memory-server').default;
const mongoose = require('mongoose');
const { createTestClient } = require('apollo-server-integration-testing');
const { GraphqlServer } = require('../src/server');

let mongoServer;

// Default timeout to wait for mongodb memory server to download, just in case..
jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

// Env vars
process.env.TWILIO_ACCOUNT_SID = 'AC4b4b1267115ae9a4f8d193d7aa2a1905';
process.env.TWILIO_AUTH_TOKEN = '7e87f4610851758326a9aa37dceb81ae';
process.env.TWILIO_SERVICE_SID = 'VA604dd7c255e59c9e96789e8e42a87b12';

beforeAll(async () => {
  mongoServer = new MongoMemoryServer({
    debug: false,
  });
  const databaseURI = await mongoServer.getUri();
  await mongoose.connect(databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

afterAll(async () => {
  await mongoServer.stop();
});

const client = GraphqlServer();
const { query, mutate } = createTestClient({
  apolloServer: client,
});

describe('Integration Tests', () => {
  it('Should login user', async () => {
    const LOGIN_USER = `
      mutation {
        loginUser(phone: "+233558691496") {
          success
        }
      }
    `;

    const response = await mutate(LOGIN_USER);
    expect(response.data).toEqual({
      loginUser: {
        success: true,
      },
    });
  });
});
