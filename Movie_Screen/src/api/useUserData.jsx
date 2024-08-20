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
		const response = await axiosClient.get('/info', {
			timeout: 1000, // 1 second timeout
		});
		return response.data;
	};

	return useQuery({
		queryKey: ['userData'],
		queryFn: getData,
		staleTime: 5 * 60 * 1000, // 5 minutes
		cacheTime: 10 * 60 * 1000, // 10 minutes
		retry: 2,
		onError: (error) => {
			console.error('Failed to fetch user data:', error);
		},
	});
};

export default useUserData;
