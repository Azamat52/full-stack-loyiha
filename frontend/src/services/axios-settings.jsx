import axios from "axios";

const $axios = axios.create({
	withCredentials: true,
	baseURL: "http://localhost:8080/api"
})

export default $axios	