module.exports = class UserDto {
	id
	email
	password
	username
	isActivated
	createdAt
	updatedAt

	constructor(model) {
		this.email = model.email
		this.username = model.username
		this.password = model.password
		this.id = model._id
		this.isActivated = model.isActivated
		this.createdAt = model.createdAt
		this.updatedAt = model.updatedAt
	}
}