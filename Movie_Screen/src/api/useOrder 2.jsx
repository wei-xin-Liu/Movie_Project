import { useQuery } from '@tanstack/react-query';
import axiosClient from '../api/axiosSetUp';

const fetchOrders = async () => {
	const response = await axiosClient.get('/user/orders');
	return response.data;
};

export const useUserOrders = () => {
	return useQuery({
		queryKey: ['userOrders'],
		queryFn: async () => {
			const data = await fetchOrders();
			console.log('Fetched orders:', data); // Add this line
			return data;
		},
	});
};
