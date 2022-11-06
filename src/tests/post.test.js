/**
 * User SignUp, SignIn 테스트 실행
 */
const request = require("supertest");
const { createApp } = require("../../app");
const { sequelize } = require("../models");
const User = require("../models/user");
const Post = require("../models/post");

describe("Post CRUD Test 시작", () => {
  let app;
  const token = "";

  beforeAll(async () => {
    app = createApp();
    await sequelize.sync();
    await User.create({
      email: "test@email.com",
      password: "test1",
      name: "testUser",
    });
    const response = await request(app)
      .post("/user/login")
      .send({
        email: "test@email.com",
        password: "test1",
      })
      .expect(200);

    if (response.status === 200) {
      token = response.body.token;
    }
  });

  // 각 전에 로그인 하고 token 받아오기
  describe("POST /post/write", (done) => {
    test("실패 : token없이 글쓰기 한 경우", (done) => {
      request(app)
        .post("/post/write")
        .set({})
        .send({
          title: "입력이 안됩니다. 제목",
          content: "일단 1자 이상이라도 적죠",
          password: "password1",
        })
        .expect(400, done);
    });

    test("성공 : 유효한 토큰 + 글쓰기 성공 ", (done) => {
      request(app)
        .post("/post/write")
        .set({ Authorization: token })
        .send({
          title: "비밀번호가 있어요 제목",
          content: "일단 1자 이상이라도 적죠",
          password: "password1",
        })
        .expect(201, done);
    });

    test("실패 : 유효한 토큰, title 누락", (done) => {
      request(app)
        .post("/post/write")
        .set({ Authorization: token })
        .send({
          content: "title 누락",
          password: "password1",
        })
        .expect(404, done);
    });

    test("실패 : 유효한 토큰, content 누락", (done) => {
      request(app)
        .post("/post/write")
        .set({ Authorization: token })
        .send({
          title: "content 누락",
          password: "password1",
        })
        .expect(409, done);
    });

    test("실패 : 유효한 토큰, 잘못된 형식의 비밀번호", (done) => {
      request(app)
        .post("/post/write")
        .set({ Authorization: token })
        .send({
          title: "title",
          content: "content",
          password: "password1",
        })
        .expect(404, done);
    });
  });

  describe("GET /post/list", () => {
    test("예외 : 게시글이 없는 경우", (done) => {
      request(app).get("/post/list").expect(204, done);
    });
    test("성공 : 게시글이 있는 경우", (done) => {
      request(app).get("/post/list").expect(200, done);
    });
  });

  describe("PATCH /post/edit/{:postId}", () => {
    const agent = request.agent(app);

    beforeEach((done) => {
      agent
        .post("/post/write")
        .set({ Authorization: token })
        .send({
          password: "password1",
          content: "원글",
          title: "원글?",
        })
        .end(done);
    });

    test("성공 : 올바른 패스워드 입력시", (done) => {
      request(app)
        .patch("/post/edit/1")
        .send({
          password: "password1",
          content: "수정성공했어요",
          title: "수정성공",
        })
        .expect(200, done);
    });

    test("실패 : 틀린 패스워드 입력시", (done) => {
      request(app)
        .patch("/post/edit/1")
        .send({
          password: "password2",
          content: "비번틀림.",
          title: "수정실패",
        })
        .expect(401, done);
    });

    test("실패 : 제목 20자 이상 혹은 내용 200자 이상 입력", (done) => {
      request(app)
        .patch("/post/edit/1")
        .send({
          title: "testtesttesttesttesttesttesttest",
          password: "password1",
        })
        .expect(400, done);
    });
  });

  describe("POST /post/delete/{:postId}", () => {
    const app = createApp();
    test("실패 : 잘못된 비밀번호", (done) => {
      request(app)
        .post("/post/delete/1")
        .send({
          password: "incorrect1",
        })
        .expect(401, done);
    });

    test("성공 : 삭제 성공", (done) => {
      request(app)
        .post("/post/delete/1")
        .send({ password: "password1" })
        .expect(204, done);
    });

    test("예외 : 없는 게시글을 삭제할 경우", (done) => {
      request(app)
        .post("/post/delete/4")
        .send({
          password: "alreadyDelete",
        })
        .expect(402);
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
});
describe("Post test: ", () => {
  test("테스트 완료", () => {});
});
