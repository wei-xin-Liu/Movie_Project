import axios from 'axios';
import { useStateContext } from '../context/ContextProvider';

const axiosClient = axios.create({
	//TODO: modify correct url
	baseURL: 'http://127.0.0.1:8000/api',
});

axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('ACCESS_TOKEN');
		// console.log('Token:', token); // Log the token
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;

			try {
				const response = await axios.post(
					'http://127.0.0.1:8000/api/refresh-token'
				);

				const { access_token, expires_in } = response.data;

				localStorage.setItem('ACCESS_TOKEN', access_token);
				// Optionally store the expiration time
				localStorage.setItem(
					'TOKEN_EXPIRATION',
					new Date().getTime() + expires_in * 1000
				);

				axiosClient.defaults.headers.common['Authorization'] =
					`Bearer ${access_token}`;
				originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

				return axiosClient(originalRequest);
			} catch (refreshError) {
				console.error('Token refresh failed:', refreshError);
				localStorage.removeItem('ACCESS_TOKEN');
				localStorage.removeItem('TOKEN_EXPIRATION');
				window.location.href = '/login';
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosClient;

// axiosClient.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		if (error.response) {
// 			// Server responded with a status other than 2xx range
// 			console.error('Response error:', error.response.data);
// 		} else if (error.request) {
// 			// Request was made but no response received
// 			console.error('Request error:', error.request);
// 		}
// 		// else {
// 		// 	// Something happened in setting up the request
// 		// 	console.error('General error:', error.message);
// 		// }
// 		return Promise.reject(error);
// 	}
// );
