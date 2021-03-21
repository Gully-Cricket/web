import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem("quarkie-token")
	}
});

instance.interceptors.request.use((config) => {
	let token                    = localStorage.getItem("quarkie-token");
	config.headers.Authorization = `Bearer ${token}`;
	return config;
}, function(error) {
	return Promise.reject(error)
});

instance.interceptors.response.use((res) => {
	return res;
}, function(error) {
	if(error.response && error.response.status === 401) {
		window.location.href = "/login";
		console.log(error.response.status);
	}
	return Promise.reject(error)
});

export default instance;
