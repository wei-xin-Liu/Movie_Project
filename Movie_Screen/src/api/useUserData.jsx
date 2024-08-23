import { useQuery } from '@tanstack/react-query';
import axiosClient from './axiosSetUp.js';

// const useUserData = () => {
// 	const getData = async () => {
// 		const response = await axiosClient.get('/info', {
// 			timeout: 1000, // 1 second timeout
// 		});
// 		return response.data;
// 	};

// 	const {
// 		data: userData,
// 		error,
// 		isLoading,
// 	} = useQuery({
// 		queryFn: getData,
// 		queryKey: ['getUserData'],
// 	});

// 	return { userData, error, isLoading };
// };

const useUserData = () => {
	const getData = async () => {
		const response = await axiosClient.get('/info');
		return response.data;
	};

	return useQuery({
		queryKey: ['userData'],
		queryFn: getData,
		staleTime: 30 * 60 * 1000, // 5 minutes
		// cacheTime: 120 * 60 * 1000, // 10 minutes
		// retry: 2,
		onSuccess: (data) => {
			console.log('login success', data);
			// localStorage.setItem('ACCESS_TOKEN', data.token);
			setSuccessMessage('User login successfully');
			if (data) {
				setToken(data.data.token);
				setUser(data.data.name);
				console.log('token', token); //token
				console.log('name', user); //null
				console.log('from data name', data.data.name); //correct
			}
		},
		onError: (error) => {
			console.error('Failed to fetch user data:', error);
		},
	});
};

export default useUserData;
