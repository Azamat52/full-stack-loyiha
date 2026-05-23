const PostService = require("../services/post-service")

class PostController {
    async getAllPosts(req, res) {
        try {
            const allPosts = await PostService.get()
            res.status(201).json({ posts: allPosts })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async createPost(req, res) {
        try {
            const newPost = await PostService.create(req.body)
            res.status(201).json({ posts: newPost })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async deletePost(req, res) {
        try {
            const deletedPost = await PostService.delete(req.params.id)
            res.status(200).json({ posts: deletedPost })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async editPost(req, res) {
        try {
            const editedPost = await PostService.edit(req.params.id, req.body)
            res.status(200).json({ posts: editedPost })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async getPostById(req, res) {
        try {
            const takedPostById = await PostService.getById(req.params.id)
            res.status(200).json({ posts: takedPostById })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new PostController()