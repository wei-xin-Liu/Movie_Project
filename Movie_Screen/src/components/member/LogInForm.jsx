import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import LogInSchema from '../../schema/LogInSchema.js';
import axiosClient from '../../api/axiosSetUp.js';
import { useStateContext } from '../../context/ContextProvider.jsx'

const LogInForm = () => {
	const { user, token, setUser, setToken } = useStateContext();
	const [generalError, setGeneralError] = useState(''); // State for general errors
	const [successMessage, setSuccessMessage] = useState('');
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		reset, // Reset function to reset form state
		formState: { errors },
		trigger, // You can use this to manually trigger validation
	} = useForm({
		resolver: yupResolver(LogInSchema),
		mode: 'onChange',
		reValidateMode: 'onTouched', // Revalidate on blur
	});

	const postData = async (data) => {
		const response = await axiosClient.post('/login', data);
		return response.data;
	};

	const mutation = useMutation({
		mutationFn: postData,

		onSuccess: ({ data }) => {
			console.log('login success', data);
			// localStorage.setItem('ACCESS_TOKEN', data.token);
			setToken(data.token);
			setUser(data.user.name);
			console.log('token', token);
			// console.log('from data name', data.user.name); //correct
			reset();
			setGeneralError('');
			setSuccessMessage('User login successfully');
			setTimeout(() => {
				navigate('/memberform');
			}, 1000); // 1000 milliseconds = 1 second			} else {
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
				} else if (status === 500) {
					setGeneralError('Internal server error. Please try again later.');
				} else if (status === 422 && data.message) {
					// Handle validation or credential errors specifically
					setGeneralError(data.message);
				} else {
					if (data.errors) {
						const backendErrors = data.errors;
						Object.keys(backendErrors).forEach((field) => {
							setError(field, {
								type: 'server',
								message: backendErrors[field][0], // Adjust if multiple messages
							});
						});
					} else {
						// Log the entire data to understand unexpected formats
						console.error('Unexpected response data:', data);
						setGeneralError(
							'An unexpected error occurred. Please try again later.'
						);
					}
				}
			} else if (error.request) {
				console.error('Request error:', error.request);
				setGeneralError('Network error. Please check your connection.');
			} else {
				console.error('General error:', error.message);
				setGeneralError(
					'An unexpected error occurred. Please try again later.'
				);
			}
		},
	});

	const onSubmit = (data) => {
		mutation.mutate(data); // Trigger the mutation to post data
		// console.log('Token:', token); // Log the token
	};

	// const handleReset = () => {
	// 	reset(); // Reset form state and clear errors
	// 	setGeneralError(''); // Clear general error message
	// };
	// const handleInputChange = (field) => async (event) => {
	// 	// Clear server-side error for the specific field when user changes input
	// 	clearErrors(field);
	// 	// Trigger Yup validation
	// 	await trigger(field);
	// };

	return (
		<div className='mt-3'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='px-0 sm:px-3 space-y-5 w-full '
			>
				{generalError && (
					<div className='text-red-500 mb-4'>{generalError}</div>
				)}
				{successMessage && (
					<div className='text-green-500 mb-4'>{successMessage}</div>
				)}
				<Input
					{...register('email')}
					isRequired
					label='Email'
					type='email'
					isInvalid={!!errors.email}
					color={errors.email ? 'danger' : 'default'}
					errorMessage={errors.email?.message}
					placeholder='Enter your email'
					labelPlacement='inside'
					required
					// onChange={handleInputChange('email')}
				/>
				<Input
					{...register('password')}
					// {...register('password', {
					// 	onBlur: () => trigger('password'), // Trigger validation on blur
					// })}
					isRequired
					label='Password'
					type='password'
					isInvalid={!!errors.password}
					color={errors.password ? 'danger' : 'default'}
					errorMessage={errors.password?.message}
					placeholder='Enter your password'
					labelPlacement='inside'
					required
					// onChange={handleInputChange('password')}
				/>
				<Button
					type='submit'
					disableRipple
					// onPress={closeModal}
					className='w-full px-4 mt-4 bg-indigo-600 text-white rounded'
				>
					Log In
				</Button>
			</form>
		</div>
	);
};

export default LogInForm;
