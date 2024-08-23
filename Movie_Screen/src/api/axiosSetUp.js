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

		if (error.response) {
			// Handle server errors
			console.error('Response error:', error.response.data);

			if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				try {
					// Attempt to refresh the token
					const refreshResponse = await axios.post('refresh-token');

					const newToken = refreshResponse.data.access_token;

					// Update the token in localStorage
					localStorage.setItem('ACCESS_TOKEN', newToken);

					// Update the Authorization header with the new token
					axiosClient.defaults.headers.common[
						'Authorization'
					] = `Bearer ${newToken}`;

					// Retry the original request with the new token
					originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
					return axiosClient(originalRequest);
				} catch (refreshError) {
					// If refresh fails, remove the token and redirect to login
					console.error('Token refresh failed:', refreshError);
					localStorage.removeItem('ACCESS_TOKEN');
					window.location.href = '/login'; // Redirect to login or handle appropriately
					return Promise.reject(refreshError);
				}
			}

			return Promise.reject(error);
		}
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
