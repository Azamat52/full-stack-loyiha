module.exports = class UserDto {
	title
	body
	description
	id
	picture
	createdAt
	updatedAt

	constructor(post) {
		this.title = post.title
		this.body = post.body
		this.description = post.description
		this.id = post._id
		this.picture = post.picture
		this.createdAt = post.createdAt
		this.updatedAt = post.updatedAt
	}
}