import { useMutation } from '@tanstack/react-query';
import RegistrationSchema from '.././schema/RegistrationSchema';
import axiosClient from '../api/axiosSetUp.js';
import { useStateContext } from '../context/ContextProvider.jsx';

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

	const logOut = async () => {
		await axiosClient.get('/logout');
	};

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
		},
		onError: (error) => {
			console.error('Logout failed:', error);
			// Handle errors, show a message, etc.
		},
	});
};

export default useLogout;
