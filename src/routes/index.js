const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const weatherRouter = require("./weatherRouter");

router.use("/user", userRouter.route);

module.exports = router;
