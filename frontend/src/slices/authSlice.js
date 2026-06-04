import { createSlice } from '@reduxjs/toolkit'
import { removeItem, setItem } from '../services/StorageSystem'

const initialState = {
	user: null,
	isLoading: false,
	loggedIn: false,
	isRegistar: false,
	registared: false,
	AuthError: null
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
			state.AuthError = action.payload
			state.isRegistar = false
			console.log(state.AuthError);
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
			state.AuthError = action.payload
			console.log("error", state.AuthError);
			
			state.isLoading = false
		},
		logout: (state) => {
			state.isLoading = true
			removeItem("token")
			state.user = null
			state.loggedIn = false
			state.AuthError = null
			state.isLoading = false
		},
		clearError: (state) => {
			state.AuthError = null
		}
	}
})

export const { startRegistar, succedRegistar, failRegistar, startLogin, succedLogin, failLogin, logout, clearError } = authSlice.actions
export default authSlice.reducer