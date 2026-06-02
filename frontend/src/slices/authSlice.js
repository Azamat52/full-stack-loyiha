import { createSlice } from '@reduxjs/toolkit'
import { removeItem, setItem } from '../services/StorageSystem'

const initialState = {
	user: null,
	isLoading: false,
	loggedIn: false,
	isRegistar: false,
	registared: false,
	errors: null
}

export const authSlice = createSlice({
	initialState,
	name: "auth",
	reducers: {
		// Registar
		startRegistar: (state) => {
			state.isRegistar = true
		},
		succedRegistar: (state) => {
			state.registared = true
			state.isRegistar = false
		},
		failRegistar: (state, action) => {
			state.errors = action.payload
			state.isRegistar = false
			console.log(state.errors);
		},
		// Login
		startLogin: (state) => {
			state.isLoading = true
			state.isRegistar = false
			state.registared = true
		},
		succedLogin: (state, action) => {
			state.loggedIn = true
			state.isRegistar = false
			state.registared = true
			state.user = action.payload
			setItem("token", state.user.accessToken)
			state.isLoading = false
		},
		failLogin: (state, action) => {
			state.errors = action.payload
			state.isLoading = false
			console.log(state.errors);
		},
		logout: (state) => {
			state.isLoading = true
			removeItem("token")
			state.user = null
			state.loggedIn = false
			state.isLoading = false
		}
	}
})

export const { startRegistar, succedRegistar, failRegistar, startLogin, succedLogin, failLogin, logout } = authSlice.actions
export default authSlice.reducer