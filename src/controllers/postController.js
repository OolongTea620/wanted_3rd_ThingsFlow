const postService = require("../services/postService");
const error = require("../middlewares/errorConstructor");
const postValidator = require("../middlewares/postValidator");

const writePost = async (req, res) => {
  const validator = new postValidator(req);
  validator.createValidator();

  const result = await postService.createPost(req);
  if (!result) {
    throw new error("Server_Error", 500);
  }

  res.status(201).json({ message: "post create success" });
};

const getPostList = async (req, res) => {
  const result = await postService.getPostList(req.query);

  if (!result) {
    res.status(204).json("No_Content");
  }
  return res.status(200).json(result);
};

const editPost = async (req, res) => {
  const validator = new postValidator(req);
  validator.updateValidator();

  const result = await postService.updatePost(req);
  if (!result) {
    res.status(500).json("UpdateFail");
  }
  res.status(200).json({ message: "update sucees" });
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const password = req.body.password;

  await postService.deletePost({ postId, password });
  res.status(200).json({ message: "delete success" });
};

module.exports = {
  writePost,
  getPostList,
  editPost,
  deletePost,
};
