/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');
const Quiz = require('../../../database/models/quiz');

const createQuiz = async () => {
  const res = await Quiz.create({
    question: "get me tea",
    answer: 'test',
    askedBy: '62051dc583514a0caa7fdac3',
  });
  return res;
};
it('should return a quiz', async () => {
  const quiz = await createQuiz();
  const response = await request(app)
  .get(`/api/v1/quiz/${quiz.id}`)
  .set("Authorization", `Bearer ${global.userSignIn()}`);
  expect(response.body.data.question).toEqual('get me tea');
});

it('should return a 401 if user is not authenticated', async () => {
  const response = await request(app).get('/api/v1/quiz/62051dc583514a0caa7fdac3');
  expect(response.status).toEqual(401);
});
