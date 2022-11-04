const userService = require("../services/userService");
const error = require("../middlewares/errorConstructor");

const signUp = async (req, res) => {
  const result = await userService.signUp(req.body);
  if (!result) {
    throw new error("Server_Error", 500);
  }
  res.status(201).json({ message: "signup success" });
};

const signIn = async (req, res) => {
  const result = await userService.signIn(req.body);
  if (!result) {
    throw new error("Server_Error", 500);
  }
  res.status(200).json({ token: result });
};

module.exports = {
  signUp,
  signIn,
};
