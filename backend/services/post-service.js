const postModel = require("../models/post-model")
const fileService = require('./file-service')

class PostService {
    async get() {
        const allPosts = await postModel.find()
        return allPosts
    }
    async create(post, picture) {
        const fileName = await fileService.save(picture)
        const createdPost = await postModel.create({ ...post, picture: fileName })
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