import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { IconExclamationCircle } from '@tabler/icons-react';

const ProtectedRoute = ({ element }) => {
	const { token } = useStateContext(); // Assuming useStateContext provides the token
	const [shouldNavigate, setShouldNavigate] = useState(false);

	useEffect(() => {
		if (!token) {
			const timer = setTimeout(() => {
				setShouldNavigate(true);
			}, 3000); // 1-second delay

			return () => clearTimeout(timer);
		}
	}, [token]);

	if (token) {
		return element; // If user is authenticated, render the protected element
	}

	if (shouldNavigate) {
		return <Navigate to='/' />; // After 1 second, redirect to the home page
	}

	return (
		<>
			<section className='text-center flex flex-col justify-center items-center h-96'>
				<IconExclamationCircle className='text-red-600 w-[300px] h-[300px] mb-4' />
				<h1 className='text-6xl font-bold mb-2'>您尚未登入會員</h1>
				<p className='mt-5 text-xl mb-5'>將跳轉至首頁....</p>
			</section>
		</>
	); // Show the login form before redirecting
};

export default ProtectedRoute;
