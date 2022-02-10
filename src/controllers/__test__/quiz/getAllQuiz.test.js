/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');
const Quiz = require('../../../database/models/quiz');

const createQuiz = async () => {
  const res = await Quiz.create({
    question: Math.random().toString(36).substr(2, 10),
    answer: 'tests',
    askedBy: '62051dc583514a0caa7fdac3',
  });
  return res;
};
it('should return a list of quiz', async () => {
  await createQuiz();
  await createQuiz();
  await createQuiz();
  const quiz = await Quiz.find();
 expect(quiz.length).toEqual(3);
});

it('returns a 401 if user is not authenticated', async () => {
  const response = await request(app).get('/api/v1/quiz');
  expect(response.status).toEqual(401);
});
