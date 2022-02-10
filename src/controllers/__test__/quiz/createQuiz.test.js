/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');
const Quiz = require('../../../database/models/quiz');

it('should return 401 if the user is not signed in', async () => {
  const res = await request(app).post('/api/v1/quiz').send({});
  expect(res.status).toEqual(401);
});

it('should return a status other than 401 if the user is signed in', async () => {
  const res = await request(app)
    .post('/api/v1/quiz')
    .set('Authorization', `Bearer ${global.userSignIn()}`)
    .send({});
  expect(res.status).not.toEqual(401);
});

it('creates a ticket with valid inputs', async () => {
  let quiz = await Quiz.find({});
  expect(quiz.length).toEqual(0);

  const question = 'I cant subscribe';
  const answer = 'Subscription';
  await request(app)
    .post('/api/v1/quiz')
    .set('Authorization', `Bearer ${global.userSignIn()}`)
    .send({
      question,
      answer,
    })
    .expect(201);
  quiz = await Quiz.find({});
  expect(quiz[0].question).toEqual(question);
});
