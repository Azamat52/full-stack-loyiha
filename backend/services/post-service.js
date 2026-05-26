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
        if (!picture) {
            throw BaseError.BadRequest("Picture is required")
        }
        if (!authorId) {
            throw BaseError.BadRequest("AuthorId is not found creating post")
        }
        const fileName = await fileService.save(picture)
        const author = await UserModel.findById(authorId)
        const authorDto = new UserDto(author)
        const createdPost = await postModel.create({ ...post, picture: fileName, author: authorId })
        const createdPostDto = new PostDto(createdPost)
        return { postInfo: createdPostDto, author: authorDto }
    }
    async delete(id) {
        if (!id) {
            throw BaseError.BadRequest("Id is not found deleting post by id")
        }
        const deletedPost = await postModel.findByIdAndDelete(id)
        const postAuthor = await UserModel.findById(deletedPost.author)
        const deletedPostDto = new PostDto(deletedPost)
        const postAuthorDto = new UserDto(postAuthor)
        return { postInfo: deletedPostDto, author: postAuthorDto }
    }
    async edit(id, post) {
        if (!id) {
            throw BaseError.BadRequest("Id is not found editing post by id")
        }
        const editedPost = await postModel.findByIdAndUpdate(id, post, { new: true })
        const postAuthor = await UserModel.findById(editedPost.author)
        const editedPostDto = new PostDto(editedPost)
        const postAuthorDto = new UserDto(postAuthor)
        return { postInfo: editedPostDto, author: postAuthorDto }
    }
    async getById(id) {
        if (!id) {
            throw BaseError.BadRequest("Id is not found getting post by id")
        }
        const takenPostById = await postModel.findById(id)
        const post = await postModel.findById(id).populate("author")
        const takenPostByIdDto = new PostDto(takenPostById)
        const takenPostByIdAuthorDto = new UserDto(post.author)
        return { postInfo: takenPostByIdDto, author: takenPostByIdAuthorDto }
    }
    async clearAll() {
        const ClearedPosts = await postModel.deleteMany({})
        return ClearedPosts
    }
}

module.exports = new PostService()