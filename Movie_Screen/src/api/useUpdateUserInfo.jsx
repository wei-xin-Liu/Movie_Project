import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from './axiosSetUp.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useUpdateUserInfo = () => {
	const [generalError, setGeneralError] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const queryClient = useQueryClient();

	const navigate = useNavigate(); // Hook to get the navigate function

	const updateUserInfo = async (data) => {
		const response = await axiosClient.put('/update-info', data);
		return response.data;
	};
	const mutation = useMutation({
		mutationFn: updateUserInfo,

		onSuccess: (data) => {
			// Optionally, invalidate queries related to user info to refresh the data
			queryClient.invalidateQueries({ queryKey: ['getUserData'] });
			console.log('Update success', data);
			setGeneralError('');
			setSuccessMessage('User information updated successfully');
			// Update local state or context if needed
			// Example: setUser(data.user);

			// Handle success feedback
			console.log('User info updated successfully', data.user);
		},

		onError: (error) => {
			console.log('Error object:', error);
			if (error.response) {
				console.log('Response error data:', error.response.data);
				console.log('Response error status:', error.response.status);
				console.log('Response error headers:', error.response.headers);

				const { data, status } = error.response;

				if (status === 404) {
					setGeneralError(
						'Resource not found. Please check the URL or endpoint.'
					);
				} else if (error.response && error.response.status === 401) {
					// Redirect to login page
					navigate('/login');
				} else if (status === 500) {
					setGeneralError('Internal server error. Please try again later.');
				} else if (status === 422 && data.message) {
					setGeneralError(`Validation error: ${data.message}`);
				} else {
					if (data.errors) {
						const backendErrors = data.errors;
						Object.keys(backendErrors).forEach((field) => {
							setGeneralError(`${field}: ${backendErrors[field][0]}`);
						});
					} else {
						setGeneralError(
							'An unexpected error occurred. Please try again later.'
						);
					}
				}
			} else if (error.request) {
				setGeneralError('Network error. Please check your connection.');
			} else {
				setGeneralError(
					'An unexpected error occurred. Please try again later.'
				);
			}
		},
	});

	return {
		mutate: mutation.mutate,
		isLoading: mutation.isLoading,
		isError: mutation.isError,
		isSuccess: mutation.isSuccess,
		generalError,
		successMessage,
	};
};

export default useUpdateUserInfo;
