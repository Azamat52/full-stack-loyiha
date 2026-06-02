import axios from "axios";
import { getItem } from './StorageSystem';

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

export default api