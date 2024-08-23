import { useMutation, QueryClient } from '@tanstack/react-query';
import RegistrationSchema from '.././schema/RegistrationSchema';
import axiosClient from '../api/axiosSetUp.js';
import { useStateContext } from '../context/ContextProvider.jsx';
import { useNavigate } from 'react-router-dom';
// const useLogout = () => {
// 	// Define the logout function to call the API
// 	const logOut = async () => {
// 		await axiosClient.get('/logout');
// 	};

// 	// Use the mutation hook to handle the logout process
// 	const mutation = useMutation(logOut, {
// 		onSuccess: () => {
// 			// Clear user data and token on successful logout
// 			setUser(null);
// 			setToken(null);
// 		},
// 		onError: (error) => {
// 			console.error('Logout failed:', error);
// 			// Handle errors, show a message, etc.
// 		},
// 	});

// 	return mutation;
// };

const useLogout = () => {
	// Define the logout function to call the API
	const { setUser, setToken } = useStateContext();
	const queryClient = new QueryClient();
	const logOut = async () => {
		await axiosClient.get('/logout');
	};
	const navigate = useNavigate();

	// OR const useLogout = (setUser, setToken) => {
	//     // Define the logout function to call the API
	//     const logOut = async () => {
	//       await axiosClient.get('/logout');
	//     };

	// Use the mutation hook to handle the logout process
	return useMutation({
		mutationFn: logOut,
		onSuccess: () => {
			// Clear user data and token on successful logout
			setUser(null);
			setToken(null);
			localStorage.removeItem('token');
			queryClient.invalidateQueries(['userData']);
			navigate('/');
		},
		onError: (error) => {
			console.error('Logout failed:', error);
			// Handle errors, show a message, etc.
		},
	});
};

export default useLogout;
