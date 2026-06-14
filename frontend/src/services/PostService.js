import api from "./api"

const PostService = {
	async getPosts() {
		const { data } = await api.get("/post/get")
		return data
	},
	async create(formData) {
		const { data } = await api.post("/post/create", formData)
		return data
	},
	async editById(id, updatedPost) {
		const { data } = await api.put(`/post/edit/${id}`, updatedPost)
		return data
	},
	async deleteById(id) {
		const { data } = await api.delete(`/post/delete/${id}`)
		return data
	},
	async getById(id) {
		const { data } = await api.get(`/post/get-by-id/${id}`)
		return data
	}
}

export default PostService