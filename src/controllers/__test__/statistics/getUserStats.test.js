/* eslint-disable no-undef */
const request = require('supertest');
const app = require("../../../app");

it('should return all quiz asked/created by a user', async () => {
  const quiz = await global.createQuiz();
  let userId = quiz.attemptedBy;
  const response = await request(app)
    .get(`/api/v1/stats/user`)
    .set('Authorization', `Bearer ${global.userSignIn(userId)}`);
  expect(response.body.status).toEqual('success');
  expect(response.status).toEqual(200);
});