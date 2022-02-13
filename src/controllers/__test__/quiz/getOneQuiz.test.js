/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');

const userId = '6207985644af7f10d7dd9f20';
it('should return a quiz', async () => {
  const quiz = await global.createQuiz();

  const response = await request(app)
    .get(`/api/v1/quiz/${quiz.id}`)
    .set('Authorization', `Bearer ${global.userSignIn(userId)}`);

  expect(response.body.message).toEqual('Quiz fetched successfully');
  expect(response.body.status).toEqual('success');
  expect(response.status).toEqual(200);
});

it('should return a 401 if user is not authenticated', async () => {
  const response = await request(app).get(
    '/api/v1/quiz/62051dc583514a0caa7fdac3'
  );

  expect(response.status).toEqual(401);
  expect(response.body.status).toEqual('fail');
});
