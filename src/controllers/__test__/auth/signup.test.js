/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../../../app');

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "sdfsfsg",
    })
    .expect(201);
});

it("returns 422 if there is no input", async () => {
  return request(app).post("/api/v1/auth/signup").send({}).expect(422);
});

it("returns 422 with an invalid password", async () => {
  return request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "s",
    })
    .expect(422);
});

it("returns 422 with an invalid email", async () => {
  return request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test",
      password: "ssss",
    })
    .expect(422);
});

it("disallows duplicated email", async () => {
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "sfsss",
    })
    .expect(201);

  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "test@gmail.com",
      password: "sfsss",
    })
    .expect(409);
});
