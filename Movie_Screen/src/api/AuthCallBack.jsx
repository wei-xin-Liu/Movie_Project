import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from './axiosSetUp';
import useUserData from './useUserData.jsx';

function AuthCallback() {
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();
	// const { setToken, setUser } = useStateContext(); // Assuming you're using these from your context

	const { refetch: refetchUserData } = useUserData();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const access_token = params.get('access_token');
		const token_type = params.get('token_type');
		const expires_in = params.get('expires_in');

		if (access_token && token_type && expires_in) {
			// Set the token in localStorage or in your auth state
			localStorage.setItem('ACCESS_TOKEN', access_token);

			// Update your axios default headers if needed
			axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

			// Refetch user data using your existing hook
			refetchUserData()
				.then(() => {
					navigate('/member'); // Redirect to dashboard after successful fetch
				})
				.catch((error) => {
					console.error('Failed to fetch user data:', error);
					navigate('/login');
				});
		} else {
			navigate('/login'); // Redirect to login if parameters are missing
		}
	}, [location, refetchUserData, navigate]);

	return null;
}

export default AuthCallback;
