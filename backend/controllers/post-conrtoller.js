const PostService = require("../services/post-service")

class PostController {
    async getAllPosts(req, res, next) {
        try {
            const allPosts = await PostService.get()
            const checkedPosts = allPosts.length > 0 ? allPosts : null
            res.status(201).json(checkedPosts)
        } catch (error) {
            next(error)
        }
    }
    async createPost(req, res, next) {
        try {
            console.log(req.body);
            const newPost = await PostService.create(req.body, req.user.id)
            res.status(201).json(newPost)
        } catch (error) {
            next(error)
        }
    }
    async deletePost(req, res, next) {
        try {
            const deletedPost = await PostService.delete(req.params.id)
            res.status(200).json(deletedPost)
        } catch (error) {
            next(error)
        }
    }
    async editPost(req, res, next) {
        try {
            const editedPost = await PostService.edit(req.params.id, req.body)
            res.status(200).json(editedPost)
        } catch (error) {
            next(error)
        }
    }
    async getPostById(req, res, next) {
        try {
            const takedPostById = await PostService.getById(req.params.id)
            res.status(200).json(takedPostById)
        } catch (error) {
            next(error)
        }
    }
    async clearAll(req, res, next) {
        try {
            const clearedAllPosts = await PostService.clearAll()
            res.status(200).json({ posts: clearedAllPosts, message: "All posts are cleared" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PostController()