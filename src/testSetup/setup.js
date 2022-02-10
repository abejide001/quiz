/* eslint-disable no-undef */
const { MongoMemoryServer } = require("mongodb-memory-server");
const  mongoose = require("mongoose");
const jwtGenerator = require("../utils/jwtGenerator");
// import jwtSign from "../helpers/token";

let mongo;
beforeAll(async () => {
  process.env.JWT_KEY = "adsfdg";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
  });

global.userSignIn = () => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT!
  const token = jwtGenerator(payload);

  return token;
};
