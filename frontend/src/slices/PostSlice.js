import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	posts: null,
	isLoading: false,
	PostError: null
}

export const postSlice = createSlice({
	initialState,
	name: "post",
	reducers: {
		getPostStart: (state, action) => {
			state.isLoading = true
		},
		getPostSucced: (state, action) => {
			state.posts = action.payload
			state.isLoading = false
		},
		getPostfail: (state, action) => {
			state.isLoading = false
			state.PostError = action.payload
			console.log(state.PostError);
		},
		createPostStart: (state) => {
			state.isLoading = true
		},
		createPostSucced: (state) => {
			state.isLoading = false
		},
		createPostfail: (state, action) => {
			state.isLoading = false
			state.PostError = action.payload
			console.log(state.PostError);
		},
		deletePostStart: (state, action) => {
			state.isLoading = true
		},
		deletePostSucced: (state) => {
			state.isLoading = false
		},
		deletePostfail: (state, action) => {
			state.isLoading = false
			state.PostError = action.payload
			console.log(state.PostError)
		},
		editPostStart: (state, action) => {
			state.isLoading = true
		},
		editPostSucced: (state) => {
			state.isLoading = false
		},
		editPostfail: (state, action) => {
			state.isLoading = false
			state.PostError = action.payload
			console.log(state.PostError)
		},
		clearPostError: (state) => {
			state.PostError = null
		}
	}
})

export const { getPostStart, getPostSucced, getPostfail, createPostStart, createPostSucced, createPostfail, deletePostStart, deletePostSucced, deletePostfail, editPostStart, editPostSucced, editPostfail, clearPostError } = postSlice.actions
export default postSlice.reducer