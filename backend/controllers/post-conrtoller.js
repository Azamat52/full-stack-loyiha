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
            const newPost = await PostService.create(req.body, req.files.picture)
            res.status(201).json({ post: newPost })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async deletePost(req, res) {
        try {
            const deletedPost = await PostService.delete(req.params.id)
            res.status(200).json({ post: deletedPost })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async editPost(req, res) {
        try {
            const editedPost = await PostService.edit(req.params.id, req.body)
            res.status(200).json({ post: editedPost })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async getPostById(req, res) {
        try {
            const takedPostById = await PostService.getById(req.params.id)
            res.status(200).json({ post: takedPostById })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new PostController()