module.exports = class UserDto {
	email
	isActivated
	id
	password
	username
	createdAt
	updatedAt

	constructor(model) {
		this.email = model.email
		this.username = model.username
		this.password = model.password
		this.id = model._id
		this.createdAt = model.createdAt
		this.updatedAt = model.updatedAt
	}
}