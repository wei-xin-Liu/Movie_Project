import React from 'react';
import GoogleButton from 'react-google-button';

const GoogleBtn = () => {
	const handleGoogleLogin = () => {
		window.location.href = 'http://localhost:8000/api/auth/google';
	};
	return (
		<div>
			<GoogleButton type='light' onClick={handleGoogleLogin} />
		</div>
	);
};

export default GoogleBtn;
