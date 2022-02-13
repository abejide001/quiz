/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');
const Statistics = require('../../../database/models/statistics');

let userId = '6207985644af7f10d7dd9f20';

it('should return 400 if the answer is wrong', async () => {
  const quiz = await global.createQuiz();
  const res = await request(app)
    .post(`/api/v1/quiz/${quiz.id}/answer`)
    .set('Authorization', `Bearer ${global.userSignIn(userId)}`)
    .send({ answer: 'tests' });
  expect(res.body.status).toEqual('fail');
  expect(res.status).toEqual(400);
  expect(res.body.error).toEqual('Your answer is wrong, please try again');
});
it('should return 200 if the user answers a question correctly', async () => {
  const quiz = await global.createQuiz();
  const res = await request(app)
    .post(`/api/v1/quiz/${quiz.id}/answer`)
    .set('Authorization', `Bearer ${global.userSignIn(userId)}`)
    .send({ answer: 'test' });
  const stats = await Statistics.findOne({ quiz: quiz.id });
  expect(stats.isCompleted).toBe(true);
  expect(stats.failedAttempts).toBe(0);
  expect(res.body.status).toEqual('success');
  expect(res.status).toEqual(200);
  expect(res.body.message).toEqual('Correct answer, well done!');
});

it('should return 422 if the user tries to answer a question that they have already answered', async () => {
  const quiz = await global.createQuiz();
  await request(app)
    .post(`/api/v1/quiz/${quiz.id}/answer`)
    .set('Authorization', `Bearer ${global.userSignIn(userId)}`)
    .send({ answer: 'test' });
  const res = await request(app)
    .post(`/api/v1/quiz/${quiz.id}/answer`)
    .set('Authorization', `Bearer ${global.userSignIn(userId)}`)
    .send({ answer: 'test' });
  expect(res.body.status).toEqual('fail');
  expect(res.status).toEqual(422);
  expect(res.body.error).toEqual(
    'You have already answered this quiz correctly'
  );
});

it('should return a 422 if the user tries to answer a question that they created', async () => {
  const quiz = await global.createQuiz();
  userId = quiz.askedBy;
  const res = await request(app)
    .post(`/api/v1/quiz/${quiz.id}/answer`)
    .set('Authorization', `Bearer ${global.userSignIn(userId)}`)
    .send({ answer: 'test' });
  expect(res.body.status).toEqual('fail');
  expect(res.status).toEqual(422);
  expect(res.body.error).toEqual("You can't answer the quiz created by you");
});
