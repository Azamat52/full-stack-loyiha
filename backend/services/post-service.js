const postModel = require("../models/post-model")

class PostService {
    async get() {
        const allPosts = await postModel.find()
        return allPosts                     
    }
    async create(post) {
        const createdPost = await postModel.create(post)
        return createdPost
    }
    async delete(id) {
        const deletedPost = await postModel.findByIdAndDelete(id)
        return deletedPost
    }
    async edit(id, post) {
        if (!id) {
            throw new Error("Id not found")
        }
        const editedPost = await postModel.findByIdAndUpdate(id, post, { new: true })
        return editedPost
    }
    async getById(id) {
        if (!id) {
            throw new Error("Id not found getting by id")
        }
        const takedPostById = await postModel.findById(id)
        return takedPostById
    }
}

module.exports = new PostService()