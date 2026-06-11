import axios from "axios";
import { getItem, setItem } from './StorageSystem';

const api = axios.create({
	withCredentials: true,
	baseURL: "http://localhost:8080/api"
})

api.interceptors.request.use(config => {
	const token = getItem("token")
	const authourization = token ? `Bearer ${token}` : ""
	config.headers.Authorization = authourization
	return config
})

api.interceptors.response.use(
	(res) => res,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			
			try {
				const { data } = await axios.get(
					"http://localhost:8080/api/auth/refresh",
					{ withCredentials: true }
				);
				const newToken = data.accessToken;
				setItem("token", newToken);
				console.log(newToken);
				
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				return api(originalRequest);
			} catch (err) {
				return Promise.reject(err);
			}
		}
		return Promise.reject(error);
	}
);


export default api