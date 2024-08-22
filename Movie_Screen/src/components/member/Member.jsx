import React, { useEffect } from 'react';
import { useStateContext } from './context/ContextProvider.jsx';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import axiosClient from '../../api/axiosSetUp.js';

const Member = () => {
	const { user, token, setUser, setToken } = useStateContext();
	console.log('User:', user);
	console.log('Token:', token);

	if (!token) {LogInForm.component';
		return <Navigate to='/login' />;
	}

	const logOut = async () => {
		await axiosClient.post('/logout');
	};
	const mutation = useMutation({
		mutationFn: logOut,
		onSuccess: () => {
			// Clear user data and token on successful logout
			setUser(null);
			setToken(null);
		},
		onError: (error) => {
			console.error('Logout failed:', error);
			// Handle errors, show a message, etc.
		},
	});

	const onLogout = (ev) => {
		ev.preventDefault();
		mutation.mutate(); // Trigger the mutation when the button is clicked
	};

	const getData = async (data) => {
		const response = await axiosClient.get('/info', data);
		return response.data;
	};

	const { data: userData } = useQuery({
		queryFn: getData,
		queryKey: ['getUserData'],
	});

	useEffect(() => {
		if (userData) {
			setUser(userData);
		}
	}, []);
	if (!user) {
		return <p>Loading...</p>;
	}
	console.log('context user', user.name);
	console.log('the user data:', userData);

	
	return (
		<div>
			<p>Hello, member: {user && user.name ? user.name : 'Loading...'}</p>
			<p>Email: {user.email}</p>
			<p>Token: {token}</p>
			<button onClick={onLogout}>Log out</button>
		</div>
	);
};

export default Member;
