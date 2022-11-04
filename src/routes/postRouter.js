const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const errorHandler = require("../middlewares/errorHandler");

router.post("/write", errorHandler(postController.writePost));
router.get("/list", errorHandler(postController.getPostList));
router.patch("/edit/:postId(\\d+)", errorHandler(postController.editPost));
router.post("/delete/:postId(\\d+)", errorHandler(postController.deletePost));

module.exports = router;
