import api from './api'

const AuthService = {
	async registar(user) {
		const { data } = await api.post("/auth/registar", user)
		return data
	},
	async login(user) {
		const { data } = await api.post("/auth/login", user)
		return data
	},
	async logout() {
		const { data } = await api.post("/auth/logout")
		return data
	},
	async refresh() {
		const { data } = await api.get("/auth/refresh")
		return data
	}
}

export default AuthService