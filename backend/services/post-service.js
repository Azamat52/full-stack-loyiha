const BaseError = require('../errors/base-error')
const postModel = require("../models/post-model")
const fileService = require('./file-service')

class PostService {
    async get() {
        const allPosts = await postModel.find()
        return allPosts
    }
    async create(post, picture) {
        const fileName = await fileService.save(picture)
        const createdPost = await postModel.create({ ...post, picture: fileName || "No photo"})
        return createdPost
    }
    async delete(id) {
        if (!id) {
            throw BaseError.BadRequest("Id is not found deleting post by id")
        }
        const deletedPost = await postModel.findByIdAndDelete(id)
        return deletedPost
    }
    async edit(id, post) {
        if (!id) {
            throw BaseError.BadRequest("Id is not found editing post by id")
        }
        const editedPost = await postModel.findByIdAndUpdate(id, post, { new: true })
        return editedPost
    }
    async getById(id) {
        if (!id) {
            throw BaseError.BadRequest("Id is not found getting post by id")
        }
        const takenPostById = await postModel.findById(id)
        return takenPostById
    }
}

module.exports = new PostService()