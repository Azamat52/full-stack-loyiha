const BaseError = require('../errors/base-error')
const postModel = require("../models/post-model")
const fileService = require('./file-service')
const PostDto = require("../dtos/post_dto")
const UserModel = require("../models/user-model")
const UserDto = require('../dtos/user-dto')

class PostService {
    async get() {
        const allPosts = await postModel.find()
        return allPosts
    }
    async create(post, picture, authorId) {
        const fileName = await fileService.save(picture)
        const author = await UserModel.findById(authorId)
        const authorDto = new UserDto(author)
        const createdPost = await postModel.create({ ...post, picture: fileName, authorId })
        const createdPostDto = new PostDto(createdPost)
        return { ...createdPostDto, author: authorDto }
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
    async clearAll() {
        const ClearedPosts = await postModel.deleteMany({})
        return ClearedPosts
    }
}

module.exports = new PostService()