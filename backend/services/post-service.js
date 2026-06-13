const BaseError = require('../errors/base-error')
const postModel = require("../models/post-model")
const fileService = require('./file-service')
const PostDto = require("../dtos/post_dto")
const UserModel = require("../models/user-model")
const UserDto = require('../dtos/user-dto')

class PostService {
    async get() {
        const allPosts = await postModel.find().populate("author")
        const formattedPosts = allPosts.map(post => {
            const postDto = new PostDto(post)
            const authorDto = new UserDto(post.author)
            return { ...postDto, author: authorDto}
        })
        return formattedPosts
    }
    async create(post, authorId, picture) {        
        if (!authorId) {
            throw BaseError.BadRequest("AuthorId is not found creating post")
        }
        const file = await fileService.save(picture)
        const createdPost = await postModel.create({ ...post, author: authorId, picture: file })
        const author = await UserModel.findById(authorId)
        const createdPostDto = new PostDto(createdPost)
        return { ...createdPostDto, author: new UserDto(author) }
    }
    async delete(id) {
        if (!id) {
            throw BaseError.BadRequest("Id is not found deleting post by id")
        }
        const deletedPost = await postModel.findByIdAndDelete(id)
        const postAuthor = await UserModel.findById(deletedPost.author)
        const deletedPostDto = new PostDto(deletedPost)
        const postAuthorDto = new UserDto(postAuthor)
        return { ...deletedPostDto, author: postAuthorDto }
    }
    async edit(id, post, picture) {
        if (!id) {
            throw BaseError.BadRequest("Id is not found editing post by id")
        }
        const file = await fileService.save(picture)
        const editedPost = await postModel.findByIdAndUpdate(id, post, { new: true })
        const postAuthor = await UserModel.findById(editedPost.author)
        const editedPostDto = new PostDto(editedPost)
        const postAuthorDto = new UserDto(postAuthor)
        return { ...editedPostDto, author: postAuthorDto }
    }
    async getById(id) {
        if (!id) {
            throw BaseError.BadRequest("Id is not found getting post by id")
        }
        const takenPostById = await postModel.findById(id)
        const post = await postModel.findById(id).populate("author")
        const takenPostByIdDto = new PostDto(takenPostById)
        const takenPostByIdAuthorDto = new UserDto(post.author)
        return { ...takenPostByIdDto, author: takenPostByIdAuthorDto }
    }
    async clearAll() {
        const ClearedPosts = await postModel.deleteMany({})
        return ClearedPosts
    }
}

module.exports = new PostService()