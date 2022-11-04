const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorHandler");

router.post("/signup", errorHandler(userController.signUp));
router.post("/login", errorHandler(userController.signIn));

module.exports = router;
