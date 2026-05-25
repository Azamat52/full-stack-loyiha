const express = require("express");
const PostController = require("../controllers/post-conrtoller");
const { postCreateValidator } = require('../errors/post-validator-result');
const validate = require('../middlewares/validate-middlewares');

const router = express.Router()

router.get("/get", PostController.getAllPosts)
router.post("/create", postCreateValidator, validate, PostController.createPost)
router.delete("/delete/:id", PostController.deletePost)
router.put("/edit/:id", PostController.editPost)
router.get("/get-by-id/:id", PostController.getPostById)


module.exports = router