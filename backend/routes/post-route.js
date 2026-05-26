const express = require("express");
const PostController = require("../controllers/post-conrtoller");
const { postCreateValidator } = require('../errors/post-validator-result');
const validate = require('../middlewares/validate-middlewares');
const authMiddlewares = require("../middlewares/auth-middlewares");
const authorEditMiddleware = require('../middlewares/author-edit-middleware');
const authorDeleteMiddleware = require("../middlewares/author-delete-middleware")

const router = express.Router()

router.get("/get", PostController.getAllPosts)
router.post("/create", authMiddlewares, postCreateValidator, validate, PostController.createPost)
router.delete("/delete/:id", authMiddlewares, authorDeleteMiddleware, PostController.deletePost)
router.put("/edit/:id", authMiddlewares, authorEditMiddleware, PostController.editPost)
router.get("/get-by-id/:id", PostController.getPostById)
router.delete("/clear", PostController.clearAll)

module.exports = router