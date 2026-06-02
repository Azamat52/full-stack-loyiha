import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	posts: null,
	isLoading: false,
	errors: null
}

export const postSlice = createSlice({
	initialState,
	name: "post",
	reducers: {
		createPostStart: (state) => {
			state.isLoading = true
		},
		createPostSucced: (state, action) => {
			state.posts = action.payload
			state.isLoading = false
		},
		createPostfail: (state, action) => {
			state.isLoading = false
			state.errors = action.payload
			console.log(state.errors);
		},
	}
})

export const { createPostStart, createPostSucced, createPostfail } = postSlice.actions
export default postSlice.reducer