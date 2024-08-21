import axiosClient from './axiosSetUp';
import { useMutation } from '@tanstack/react-query';


const deleteAccount = async () => {
	const response = await axiosClient.delete('/delete-account');
	return response.data;
};

const useDeleteAccount = () => {
	return useMutation({
		mutationFn: deleteAccount,
		onSuccess: (data) => {
			console.log(data.message);
			// Handle success, e.g., log out the user, redirect to a different page, etc.
		},
		onError: (error) => {
			console.error(
				'Error deleting account:',
				error.response?.data?.message || error.message
			);
			// Handle error, e.g., show an error message to the user
		},
	});
};

export default useDeleteAccount;
