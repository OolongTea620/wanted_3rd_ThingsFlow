require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const saltRound = process.env.SALT;
  const salt = await bcrypt.genSalt(saltRound);

  return await bcrypt.hash(password, salt);
};
const matchPassword = async (inputpassword, userPassword) => {
  return await bcrypt.compare(inputpassword, userPassword);
};
const getAccessToken = async (id) => {
  const accessToken = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return accessToken;
};
module.exprots = {
  hashPassword,
  matchPassword,
};
