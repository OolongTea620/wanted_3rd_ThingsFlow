const userService = require("../services/userService");
const error = require("../middlewares/errorConstructor");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const name = req.body.name || null;
  if (!email || !password) {
    throw new error("Key_Error", 400);
  }

  const result = await userService.createUser({ email, password, name });
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
