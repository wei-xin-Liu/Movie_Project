import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { IconExclamationCircle } from '@tabler/icons-react';
import useUserData from '../api/useUserData.jsx';
import Loading from '../components/Loading.jsx';

const ProtectedRoute = ({ element }) => {
	const { token } = useStateContext(); // Assuming useStateContext provides the token
	const [shouldNavigate, setShouldNavigate] = useState(false);
	const navigate = useNavigate();
	const { data: userData, isLoading } = useUserData();
	console.log('userData:', userData); //not defined
	// console.log(userData.name);
	console.log('userData:', token);
	console.log(userData?.user.name);
	console.log(userData?.token);

	// useEffect(() => {
	// 	if (!userData?.token) {
	// 		const timer = setTimeout(() => {
	// 			setShouldNavigate(true);
	// 		}, 2500); // 1-second delay

	// 		return () => clearTimeout(timer);
	// 	}
	// }, [userData]);

	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	if (userData?.token) {
		return element; // If user is authenticated, render the protected element
	}

	useEffect(() => {
		if (!tokenData) {
			navigate('/');
		}
	}, [tokenData, navigate]);

	return (
		<>
			<section className='text-center flex flex-col justify-center items-center h-96'>
				<IconExclamationCircle className='text-red-600 w-[300px] h-[300px] mt-8 mb-4' />
				<h1 className='text-6xl font-bold mb-2'>您尚未登入會員</h1>
				<p className='mt-5 text-xl mb-5'>將跳轉至首頁....</p>
			</section>
		</>
	); // Show the login form before redirecting
};

export default ProtectedRoute;
