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


api.interceptors.response.use((res) => {
	return res
	console.log(res);
},
	async (err) => {
		if (err.status === 401) {
			try {
				const { data } = await axios.get("http://localhost:8080/api/auth/refresh", { withCredentials: true })
				
				const newToken = data.accessToken
				err.config.headers.Authorization = newToken ? `Bearer ${newToken}` : ""
				return api(err.config)
			} catch (error) {
				return Promise.reject(error)
				console.log("catch ishladi");
			}
		}
		return Promise.reject(err)
		console.log("vashem ishlamadi");
	}
)

export default api