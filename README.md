# Quiz App

[![CircleCI](https://circleci.com/gh/abejide001/quiz.svg?style=svg)](https://app.circleci.com/pipelines/github/abejide001/customer-support/54a914c3-105e-4010-bbb6-281cfcfb8451)

Quiz App API

## Introduction

Welcome to version 1 of Quiz App API. Below you will find a current list of available methods on different endpoints.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

To work with this project you need to have the following installed on your local machine

1. [NodeJS](https://nodejs.org)
2. [Git](https://git-scm.com/downloads)
3. [MongoDB](https://docs.mongodb.com/manual/installation/) For local development vanilla mongodb without authentication is expected and it should be listening on localhost:27017
4. [Postman](https://www.postman.com/downloads/)

## Install and run locally

```bash
git clone https://github.com/abejide001/quiz.git
cd quiz

export
MONGOMS_DOWNLOAD_URL=http://downloads.mongodb.org/linux/mongodb-linux-x86_64-debian10-latest.tgz
mv .env.sample .env
npm i
NODE_ENV=development npm run seed:dev # seeds dev database
NODE_ENV=development npm run start:dev # dev environment
```

## Running **Tests**

```bash
git clone https://github.com/abejide001/quiz.git
cd quiz
# rename .env.sample to .env, and set your environment variables -- no username&password for local database

export
MONGOMS_DOWNLOAD_URL=http://downloads.mongodb.org/linux/mongodb-linux-x86_64-debian10-latest.tgz
mv .env.sample .env
npm i
npm run test
```

## Run with Docker

set the DATABASE_URL to mongodb://mongo:27017/quizapp before running the command below

```bash
docker-compose up --build
```

## API Usage

API BASE URL(<https://quiz-2022.herokuapp.com/api/v1>). It's recommended to attach a `Authorization` Header containing the generated `token` from `/api/v1/auth/signin` to access requests.

### Quiz endpoints `/quiz`

| method | route              | description                        | data                   |
|--------|--------------------|------------------------------------|----------------- ------|
| GET    | /                  | Get all quiz                       |                        |
| POST   | /                  | Create a quiz                      | `{question, answer}`   |
| GET    | /:id               | Get a single quiz                  |                        |
| PUT    | /:id               | Update a quiz                      | `{question, answer}`   |
| POST   | /:id/answer        | Answer a quiz question             | `{answer}`             |

### Stats endpoint `/stats`

| method | route      | description                                          |
|--------|------------|------------------------------------------------------|
| GET    | /user      | Get statistics for the quiz attempted by a user      |
| GET    | /quiz      | Get statistics for the quiz created by a user        |

### Authentication endpoints `/auth`

| method | route   | description | data                |
|--------|---------|-------------|---------------------|
| POST   | /sigin  | Sign In     | `{email, password}` |
| POST   | /signup | Sign up     | `{email, password}` |

## API Docs

<https://quiz-2022.herokuapp.com/api/v1/docs> (change the Schemes to HTTPS)

## App URL

<https://quiz-2022.herokuapp.com/api/v1>

## Author

Abejide Femi - abejidefemi1@gmail.com
