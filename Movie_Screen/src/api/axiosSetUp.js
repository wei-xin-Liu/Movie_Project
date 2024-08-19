import axios from 'axios';
import { useStateContext } from './context/ContextProvider.jsx';

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

					// Update the token in localStorage
					localStorage.setItem('ACCESS_TOKEN', refreshResponse.data.token);

					// Update the Authorization header with the new token
					axiosClient.defaults.headers.Authorization = `Bearer ${refreshResponse.data.token}`;

					// Retry the original request with the new token
					originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
					return axiosClient(originalRequest);
				} catch (refreshError) {
					// If refresh fails, remove the token and redirect to login
					localStorage.removeItem('ACCESS_TOKEN');
					window.location.href = '/login'; // Redirect to login or handle appropriately
					return Promise.reject(refreshError);
				}
			}
		} else if (error.request) {
			// Handle no response from server
			console.error('Request error:', error.request);
		} else {
			// Handle other errors
			console.error('General error:', error.message);
		}

		return Promise.reject(error);
	}
);

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

export default axiosClient;
