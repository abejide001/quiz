/* eslint-disable no-undef */
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
const { MongoMemoryServer } = require("mongodb-memory-server");
const  mongoose = require("mongoose");
const Quiz = require("../database/models/quiz");
const jwtGenerator = require("../utils/jwtGenerator");

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
    id: "6207985644af7f10d7dd9f20",
    email: "test@test.com",
  };
  // Create the JWT!
  const token = jwtGenerator(payload);

  return token;
};

global.createQuiz = async () => {
  return await Quiz.create({
    question: Math.random().toString(36).substr(2, 10),
    answer: 'test',
    askedBy: '62051dc583514a0caa7fdac3',
  });
};
