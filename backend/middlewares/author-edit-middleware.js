const BaseError = require("../errors/base-error")
const postModel = require("../models/post-model")

module.exports = async function (req, res, next) {
	try {

		const postId = req.params.id

		if (!postId) {
			return next(
				BaseError.BadRequest("Post id is required")
			)
		}

		const post = await postModel.findById(postId)

		if (!post) {
			return next(
				BaseError.BadRequest("Post not found")
			)
		}

		const currentUserId = req.user.id

		if (post.author.toString() !== currentUserId) {
			return next(
				BaseError.BadRequest(
					"Only author can edit this post"
				)
			)
		}

		next()

	} catch (error) {
		next(BaseError.BadRequest("Only author can edit this post", error))
	}
}