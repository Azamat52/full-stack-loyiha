import api from "./api"

const PostService = {
	async getPosts() {
		const { data } = await api.get("/post/get")
		return data
	},
	async create(newPost) {
		const { data } = await api.post("/post/create", newPost)
		return data
	},
	async deleteById(id) {
		const { data } = await api.delete(`/post/delete/${id}`)
		return data
	}
}

export default PostService