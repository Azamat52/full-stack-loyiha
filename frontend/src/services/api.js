import axios from "axios";
import store from "../store/store";
import { getItem, setItem } from './StorageSystem';

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


export default api