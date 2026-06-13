const express = require("express");
const PostController = require("../controllers/post-conrtoller");
const { postValidator } = require('../errors/post-validator-result');
const validate = require('../middlewares/validate-middlewares');
const authMiddlewares = require("../middlewares/auth-middlewares");
const authorEditMiddleware = require('../middlewares/author-edit-middleware');
const authorDeleteMiddleware = require("../middlewares/author-delete-middleware");
const activationMiddleware = require('../middlewares/activation-middleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router()	

router.get("/get", PostController.getAllPosts)
router.post("/create", uploadMiddleware, postValidator, validate, authMiddlewares, activationMiddleware, PostController.createPost)
router.delete("/delete/:id", authMiddlewares, authorDeleteMiddleware, PostController.deletePost)
router.put("/edit/:id", postValidator, validate, authMiddlewares, authorEditMiddleware, PostController.editPost)
router.get("/get-by-id/:id", PostController.getPostById)
router.delete("/clear", PostController.clearAll)

module.exports = router