const weatherService = require("./weatherService");
const crypto = require("../utils/crypto");
const Post = require("../models/post");
const WeatherRecord = require("../models/weatherRecord");

const error = require("../middlewares/errorConstructor");

const getPostById = async (postId) => {
  const post = await Post.findOne({
    where: {
      id: postId,
    },
  });

  return post;
};

const matchPostPassword = async (inputPass, postpass) => {
  if (!postpass) {
    return true;
  }
  return await crypto.matchPassword(inputPass, postpass);
};

const createPost = async (req) => {
  const password = req.body.password || null;
  const hashedPassword = password ? await crypto.hashPassword(password) : null;
  const input = {
    title: req.body.title,
    content: req.body.content,
    user_id: req.user.id,
    password: hashedPassword || null,
  };
  const post = await Post.create(input);

  const weatherRecord = await weatherService.recordWeather(req, post.id);
  return post;
};

const getPostList = async (query) => {
  const sort = query.sort || undefined;
  const orderBy = !sort && sort === "past" ? "ASC" : "DESC";

  const result = await Post.findAll({
    attributes: { exclude: ["password"] },
    order: [["created_at", orderBy]],
    include: [
      {
        model: WeatherRecord,
        required: false,
        attributes: ["expression", "temperature_c", "humidity"],
      },
    ],
  });
  return result;
};

const updatePost = async (data) => {
  const postId = data.params.postId;
  const body = data.body;

  const post = await getPostById(postId);
  const postPassword = post.password;
  if (!(await matchPostPassword(body.password, postPassword))) {
    throw new error("incorrect password", 401);
  }
  delete body.password;

  const result = await Post.update(
    { ...body },
    {
      where: {
        id: postId,
      },
    }
  );

  return result;
};

const deletePost = async (data) => {
  const { postId, password } = data;
  const post = await getPostById(postId);

  if (!post) {
    throw new error("No_Content", 402);
  }
  const postPassword = post.password;

  if (!(await matchPostPassword(password, postPassword))) {
    throw new error("incorrect password", 401);
  }

  const result = await Post.destroy({ where: { id: postId } });
  return result;
};

module.exports = { createPost, getPostList, updatePost, deletePost };
