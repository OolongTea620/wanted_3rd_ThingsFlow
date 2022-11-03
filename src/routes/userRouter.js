const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/signup");
router.post("/login");

module.exports = router;
