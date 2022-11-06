/**
 * User SignUp, SignIn 테스트 실행
 */
const request = require("supertest");
const { createApp } = require("../../app");
const { sequelize } = require("../models");

beforeAll(async () => {
  app = createApp();
  await sequelize.sync();
});

describe("POST /user/signup", () => {
  test("가입 성공 : 모두 올바른 케이스", (done) => {
    request(app)
      .post("/user/signup")
      .send({
        email: "test1@example.com",
        password: "testpassword1",
        name: "test1",
      })
      .expect(201, done);
  });

  test("가입 성공: name 없어도 가능", (done) => {
    request(app)
      .post("/user/signup")
      .send({
        email: "test2@email.com",
        password: "testpassword2",
      })
      .expect(201, done);
  });
});

describe("POST user/signup 실패 : 키-값 누락", () => {
  app = createApp();
  test("가입 실패: email 누락", (done) => {
    request(app)
      .post("/user/signup")
      .send({
        password: "testpassword1",
        name: "test1",
      })
      .expect(400, done);
  });

  test("가입 실패: password 누락", (done) => {
    request(app)
      .post("/user/signup")
      .send({
        password: "testpassword1",
        name: "test1",
      })
      .expect(400, done);
  });
});

describe("POST /user/signup 실패 :이미 가입된 유저", () => {
  const app = createApp();
  const agent = request.agent(app);
  beforeEach((done) => {
    agent
      .post("/user/signup")
      .send({
        email: "already@email.com",
        password: "already1",
        name: "alreadyUser",
      })
      .end(done);
  });

  test("가입실패 : 이미 가입된 유저인 경우", (done) => {
    agent
      .post("/user/signup")
      .send({
        email: "already@email.com",
        password: "already1",
        name: "alreadyUser",
      })
      .expect(409, done);
  });
});

describe("POST /user/login", () => {
  const app = createApp();
  const agent = request.agent(app);

  beforeEach((done) => {
    agent
      .post("/user/signup")
      .send({
        email: "already@email.com",
        password: "already1",
        name: "alreadyUser",
      })
      .end(done);
  });

  test("성공 : 200과 토큰 반환", (done) => {
    agent
      .post("/user/login")
      .send({
        email: "already@email.com",
        password: "already1",
      })
      .expect(200, done);
  });

  test("실패 : 실패 메시지", (done) => {
    agent
      .post("/user/login")
      .send({
        email: "already@email.com",
        password: "incorrectPassword",
      })
      .expect(401, done);
  });
});

afterAll(async () => {
  await sequelize.query(`SET foreign_key_checks = 0`);
  await sequelize.query(`TRUNCATE user`);
  await sequelize.query(`TRUNCATE post`);
  await sequelize.query(`TRUNCATE weather_record`);
  await sequelize.query(`SET foreign_key_checks = 1`);
  await sequelize.close();
});
