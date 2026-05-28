import $axios from "./axios-settings"

const PostService = {
	async create(newPost) {
		const { data } = await $axios.post("/post/create", newPost)
		return data
	}
}

export default PostService