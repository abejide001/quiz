/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');

it('should return an error if user tries to update a quiz they did not create', async () => {
  const quiz = await global.createQuiz();
  const response = await request(app)
    .put(`/api/v1/quiz/${quiz.id}`)
    .set('Authorization', `Bearer ${global.userSignIn()}`)
    .send({ question: 'what is my name' });
  expect(response.body.status).toEqual('fail');
  expect(response.status).toEqual(403);
});

it('should update a quiz that was created by the user', async () => {
  const question = 'I cant subscribe';
  const answer = 'Subscription';
  const createdQuiz = await request(app)
    .post('/api/v1/quiz')
    .set('Authorization', `Bearer ${global.userSignIn()}`)
    .send({
      question,
      answer,
    });
    const response = await request(app)
    .put(`/api/v1/quiz/${createdQuiz.body.data.quiz.id}`)
    .set('Authorization', `Bearer ${global.userSignIn()}`)
    .send({ question: 'what is my name' });
  expect(response.body.status).toEqual('success');
  expect(response.status).toEqual(200);
});
