import api from "./api"

const PostService = {
	async create(newPost) {
		const { data } = await api.post("/post/create", newPost)
		return data
	}
}

export default PostService