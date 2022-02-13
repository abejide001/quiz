/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');
const Quiz = require('../../../database/models/quiz');

it('should return a list of quiz', async () => {
  await global.createQuiz();
  await global.createQuiz();
  await global.createQuiz();
  const quiz = await Quiz.find();
  expect(quiz.length).toEqual(3);
});

it('returns a 401 if user is not authenticated', async () => {
  const response = await request(app).get('/api/v1/quiz');
  expect(response.status).toEqual(401);
});
