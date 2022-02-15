/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');
const Quiz = require('../../../database/models/quiz');

const userId = '6207985644af7f10d7dd9f20';

it('should return a list of quiz', async () => {
  await global.createQuiz();
  await global.createQuiz();
  await global.createQuiz();
  const quiz = await Quiz.find();
  const response = await request(app)
    .get(`/api/v1/quiz/`)
    .set('Authorization', `Bearer ${global.userSignIn(userId)}`);
  expect(response.status).toEqual(200);
  expect(response.body.status).toEqual('success');
  expect(response.body.message).toEqual('Quizzes fetched successfully');
  expect(quiz.length).toEqual(3);
});

it('returns a 401 if user is not authenticated', async () => {
  const response = await request(app).get('/api/v1/quiz');
  expect(response.status).toEqual(401);
});
