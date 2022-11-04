const Post = require("../models/post");
const crypto = require("../utils/crypto");
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

const createPost = async (data) => {
  const password = data.password;
  const hashedPassword = crypto.hashPassword(password);

  const post = await Post.create({
    title,
    content,
    password: hashedPassword,
    user_id: data.UserId,
  });
  return post;
};

const getPostList = async (data) => {
  const sort = data.sort === "past" ? "ASC" : "DESC";
  const result = await Post.findAll({ order: ["created_at", sort] });
  return result;
};

const updatePost = async (data) => {
  const postId = data.postId;
  const post = await getPostById(postId);
  const postPassword = post.password;

  if (!(await matchPostPassword(data.password, postPassword))) {
    throw error("incorrect password", 401);
  }

  const result = await post.update(
    {
      title: data.title,
      content: data.content,
    },
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
  const postPassword = post.password;

  if (!(await matchPostPassword(password, postPassword))) {
    throw error("incorrect password", 401);
  }

  const result = await Post.destroy({ where: { id: postId } });
  return result;
};

module.exports = { createPost, getPostList, updatePost, deletePost };
