/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');

it('should fail when the account does not exist', async () => {
  const res = await request(app).post('/api/v1/auth/signin').send({
    email: 'test@gmail.com',
    password: 'asff',
  });
  expect(res.status).toEqual(401);
  expect(res.body.status).toEqual('fail');
});

it('should fail when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@gmail.com',
      password: 'sdfsfsg',
    })
    .expect(201);

  await request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'test@gmail.com',
      password: 'sdfssf',
    })
    .expect(401);
});

it('should fail when an incorrect mail is supplied', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@gmail.com',
      password: 'sdfsfsg',
    })
    .expect(201);

  await request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'tes@gmail.com',
      password: 'sdfssf',
    })
    .expect(401);
});

it('should pass when a valid email and password is supplied', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@gmail.com',
      password: 'abcde',
    })
    .expect(201);

  await request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'test@gmail.com',
      password: 'abcde',
    })
    .expect(200);
});
