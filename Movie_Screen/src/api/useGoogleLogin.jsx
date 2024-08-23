import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '../api/axiosSetUp.js';

const useGoogleLogin = () => {
	const getGoogleCB = async () => {
		const response = await axiosClient.post('auth/google/callback');
		return response.data;
	};

	return useMutation({
		mutationFn: getGoogleCB,

		onSuccess: (data) => {
			console.log('login success', data);
			localStorage.setItem('token', data.token);
		},
		onError: (error) => {
			console.error('Failed to fetch user data:', error);
		},
	});
};

export default useGoogleLogin;
