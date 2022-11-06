const jwt = require("jsonwebtoken");
const error = require("../middlewares/errorConstructor");
const userService = require("../services/userService");

const loginRequired = async (req, res, next) => {
  try {
    let accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(400).json("Invalid User");
    }

    const veryfiedToken = await jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await userService.getUserById(veryfiedToken.id);

    if (!user) {
      return res.status(400).json("Invalid User");
    }

    req.user = user;
    next();
  } catch (err) {
    throw new error(err.message, err.statusCode);
  }
};

module.exports = {
  loginRequired,
};
