import axios from "axios";
import store from "../store/store";
import { getItem, removeItem, setItem } from './StorageSystem';

const api = axios.create({
	withCredentials: true,
	baseURL: "http://localhost:8080/api",
	headers: {
		"Content-Type": "multipart/form-data"
	}
})

api.interceptors.request.use(config => {
	const token = getItem("token")
	const authourization = token ? `Bearer ${token}` : ""
	config.headers.Authorization = authourization
	return config
})

api.interceptors.response.use((res) => res,
	async (err) => {
		// Expired Token
		if (err.response?.status === 401 && !err.config._retry) {
			err.config._retry = true

			try {
				const res = await axios.get("http://localhost:8080/api/auth/refresh", { withCredentials: true })

				const newAccessToken = res.data.accessToken
				setItem("token", newAccessToken)

				err.config.headers.Authorization = `Bearer ${newAccessToken}`

				return api(err.config)
			} catch (error) {
				removeItem("token")
				window.location.href = "/auth"

				return Promise.reject(error)
			}
		}
		return Promise.reject(error)
	}
)


export default api