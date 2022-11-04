const userService = require("../services/userService");
const error = require("../middlewares/errorConstructor");
const PostValidator = require("../middlewares/Postvalidator");

const writePost = async (req, res) => {
  const validator = new PostValidator(req);
  validator.createValidator();

  const result = await userService.writePost(req.body);
  if (!result) {
    throw new error("Server_Error", 500);
  }
  res.status(201).json({ message: "post create success" });
};

const getPostList = async (req, res) => {
  const query = req.query;
  const result = await userService.getPostList(query);
  if (!result) {
    res.status(204).json("No_Content");
  }
};

const editPost = async (req, res) => {
  const validator = new PostValidator(req);
  validator.updateValidator();

  const result = await userService.updatePost(req);
  if (!result) {
    res.status(500).json("UpdateFail");
  }
  res.status(200).json("update sucees");
};

const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const password = req.body.password;

  const result = await userService.deletePost({ postId, password });
  res.staus(204).json("delete success");
};

module.exports = {
  writePost,
  getPostList,
  editPost,
  deletePost,
};
