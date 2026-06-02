module.exports = class UserDto {
	title
	body
	description
	id
	createdAt
	updatedAt

	constructor(post) {
		this.title = post.title
		this.body = post.body
		this.description = post.description
		this.id = post._id
		this.createdAt = post.createdAt
		this.updatedAt = post.updatedAt
	}
}