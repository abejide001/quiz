/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../app');

it("should fail when the account does not exist", async () => {
  const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({
      email: "test@gmail.com",
      password: "asff",
    });
  expect(res.status).toEqual(401);
  expect(res.body.status).toEqual('fail');
});

it("should return 422 if there is no input", async () => {
  const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({});
  expect(res.status).toEqual(422);
  expect(res.body.status).toEqual('fail');
  expect(res.body.error[0].email).toEqual('email is required');
  expect(res.body.error[1].password).toEqual('password is required');
});

it("should return 422 when an invalid email is provided", async () => {
  const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({
      email: "abab",
      password: "abcde"
    });
    expect(res.status).toEqual(422);
    expect(res.body.status).toEqual('fail');
    expect(res.body.error[0].email).toEqual('email must be valid');
});


it("should return 422 when password is not provided", async () => {
  await request(app)
    .post("/api/v1/auth/signin")
    .send({
      email: "abab@gmail.com",
      password: ""
    })
    .expect(422);
});


it("should return 422 when password is less than 4", async () => {
  await request(app)
    .post("/api/v1/auth/signin")
    .send({
      email: "abab@gmail.com",
      password: "ba"
    })
    .expect(422);
});

it("should fail when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "sdfsfsg",
    })
    .expect(201);

  await request(app)
    .post("/api/v1/auth/signin")
    .send({
      email: "test@gmail.com",
      password: "sdfssf",
    })
    .expect(401);
});

it("should fail when an incorrect mail is supplied", async () => {
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "sdfsfsg",
    })
    .expect(201);

  await request(app)
    .post("/api/v1/auth/signin")
    .send({
      email: "tes@gmail.com",
      password: "sdfssf",
    })
    .expect(401);
});

