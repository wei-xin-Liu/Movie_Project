// useTotalPoints.jsx
import { useQuery } from '@tanstack/react-query';
import axiosClient from '../api/axiosSetUp';

const fetchTotalPoints = async () => {
	const { data } = await axiosClient.get('/user/points');
	return data.total_points;
};

const useTotalPoints = () => {
	return useQuery({
		queryKey: ['totalPoints'],
		queryFn: fetchTotalPoints,
	});
};

export default useTotalPoints;
