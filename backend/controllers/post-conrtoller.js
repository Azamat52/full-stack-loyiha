const PostService = require("../services/post-service")

class PostController {
    async getAllPosts(req, res, next) {
        try {
            const allPosts = await PostService.get()
            res.status(201).json({ posts: allPosts })
        } catch (error) {
            next(error)
        }
    }
    async createPost(req, res, next) {
        try {
            const newPost = await PostService.create(req.body, req.files.picture)
            res.status(201).json({ post: newPost })
        } catch (error) {
            next(error)
        }
    }
    async deletePost(req, res, next) {
        try {
            const deletedPost = await PostService.delete(req.params.id)
            res.status(200).json({ post: deletedPost })
        } catch (error) {
            next(error)
        }
    }
    async editPost(req, res, next) {
        try {
            const editedPost = await PostService.edit(req.params.id, req.body)
            res.status(200).json({ post: editedPost })
        } catch (error) {
            next(error)
        }
    }
    async getPostById(req, res, next) {
        try {
            const takedPostById = await PostService.getById(req.params.id)
            res.status(200).json({ post: takedPostById })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PostController()