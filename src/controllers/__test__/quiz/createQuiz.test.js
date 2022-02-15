/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');
const Quiz = require('../../../database/models/quiz');

const userId = '6207985644af7f10d7dd9f20';

it('should return 401 if the user is not signed in', async () => {
  const response = await request(app).post('/api/v1/quiz').send({});
  expect(response.status).toEqual(401);
});

it('should return a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/v1/quiz')
    .set('Authorization', `Bearer ${global.userSignIn(userId)}`)
    .send({});

  expect(response.body.status).toEqual('fail');
  expect(response.body.error[0].question).toEqual('question is required');
  expect(response.body.error[1].answer).toEqual('answer is required');
  expect(response.status).not.toEqual(401);
});

it('creates a quiz with valid inputs', async () => {
  let quiz = await Quiz.find({});
  expect(quiz.length).toEqual(0);

  const question = 'I cant subscribe';
  const answer = 'Subscription';
  const response = await request(app)
    .post('/api/v1/quiz')
    .set('Authorization', `Bearer ${global.userSignIn(userId)}`)
    .send({
      question,
      answer,
    });
  quiz = await Quiz.find({});

  expect(quiz[0].question).toEqual(question);
  expect(quiz[0].answer).toEqual(answer);
  expect(response.status).toEqual(201);
  expect(response.body.status).toEqual('success');
});
