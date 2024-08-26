import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function GoPay() {
	const navigate = useNavigate();

	const token = localStorage.getItem('ACCESS_TOKEN'); // Check if user is logged in

	const saveBooking = useMutation({
		mutationFn: async (data) => {
			try {
				const response = await axios.post(
					'http://127.0.0.1:8000/api/member-order',
					data,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				);
				console.log('Response:', response);
				return response.data;
			} catch (error) {
				console.error(
					'Axios error:',
					error.response ? error.response.data : error.message
				);
				throw error;
			}
		},
	});

	const handleProceedToPayment = () => {
		const order = JSON.parse(localStorage.getItem('order'));
		if (!order) {
			console.error('Order data is missing');
			return;
		}

		const { totalPrice, ...details } = order;

		const data = {
			detail: JSON.stringify(details),
			totalPrice: parseInt(totalPrice, 10), // Ensure totalPrice is an integer
		};

		console.log('Data to be sent:', data); // Log the data for debugging

		saveBooking.mutate(data); // Trigger the mutation
	};

	return <button onClick={handleProceedToPayment}>Proceed to Payment</button>;
}

export default GoPay;
