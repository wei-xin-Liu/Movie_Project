import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleBtn = () => {
	const handleGoogleLogin = () => {
		window.location.href = 'http://localhost:8000/api/auth/google';
	};
	const errorMessage = (error) => {
		console.log(error);
	};
	return (
		<>
			{/* <GoogleButton onClick={handleGoogleLogin} /> */}
			<GoogleLogin
				width='400px'
				height='40px'
				size='large'
				theme='filled_blue'
				onSuccess={handleGoogleLogin}
				onError={errorMessage}
			/>
		</>
	);
};

export default GoogleBtn;
