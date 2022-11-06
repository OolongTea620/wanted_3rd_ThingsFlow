require("dotenv").config();
const crypto = require("../utils/crypto");
const User = require("../models/user");
const error = require("../middlewares/errorConstructor");

const getUserbyEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  return user;
};

const createUser = async (userData) => {
  const { email, password, name } = userData;

  const isSignUp = await getUserbyEmail(email);
  if (isSignUp) {
    throw new error("Signed_User", 409);
  }

  const hashedPassword = await crypto.hashPassword(password);

  const user = await User.create({
    email: email,
    password: hashedPassword,
    name: name,
  });

  return user;
};

const signIn = async (userData) => {
  const { email, password } = userData;
  const user = await getUserbyEmail(email);

  if (!user) {
    throw new error("Invalid_User", 404);
  }
  const isMatch = await crypto.matchPassword(password, user.password);
  if (!isMatch) {
    throw new error("Incorrect_Password", 401);
  }
  const accessToken = await crypto.getAccessToken(user.id);

  return accessToken;
};

module.exports = { createUser, signIn };
