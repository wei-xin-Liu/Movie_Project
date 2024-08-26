import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function Choosepay() {
	const { state } = useLocation();

	let itemDescArray = '';
	const { selectedFoods, ticketCounts, totalPrice } = state;
	const entries = Object.entries(ticketCounts);
	const filteredEntries = entries.filter(([key, value]) => value > 0);
	filteredEntries.map(([key, value]) => {
		// "adult":1,"student":0,"early":0,"love":0
		if (key == "adult") {
			key = "全票"
		}
		else if (key == "student") {
			key = "學生票"
		}
		else if (key == "early") {
			key = "早鳥票"
		}
		else if (key == "love") {
			key = "愛心票"
		}
		return (itemDescArray += `${key}x${value}, \n`);
	});


	for (let index = 0; index < selectedFoods.length; index++) {
		itemDescArray += `${selectedFoods[index].name}x${selectedFoods[index].quantity}, \n`;
	}


	const totalPricestr = totalPrice.toString();

	const [paymentMethod, setPaymentMethod] = useState('online');
	const [data, setData] = useState([]);

	const navigate = useNavigate();
	const token = localStorage.getItem('ACCESS_TOKEN'); // Check if user is logged in

	const saveBooking = useMutation({
		mutationFn: async (orderdata) => {
			try {
				const response = await axios.post(
					'http://127.0.0.1:8000/api/member-order',
					orderdata,
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

	const handleSubmit = async (e) => {
		e.preventDefault(); // 阻止表單默認提交行為

		const order = JSON.parse(localStorage.getItem('order'));
		if (!order) {
			console.error('Order orderdata is missing');
			return;
		}

		console.log(order);

		const { totalPrice, ...details } = order;
		console.log(details);
		const orderdata = {
			detail: JSON.stringify(details),
			totalPrice: parseInt(totalPrice, 10), // Ensure totalPrice is an integer
		};

		console.log('Orderdata to be sent:', orderdata); // Log the orderdata for debugging
		saveBooking.mutate(orderdata); // Trigger the mutation

		try {
			const response = await axios.post('http://127.0.0.1:8000/api/bluepay', {
				itemDescArray,
				totalPricestr,
			});

			setData(response.data); // 保存數據到狀態
			console.log(response.data);
			// navigate('/Bluepay', { state: { data: response.data } });

			// 立即導航到新頁面，並傳遞數據
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	return (
		<div
			className={`
          m-auto
          w-full
          md:w-1/3
          text-center
          bg-yellow-100
          p-6
          rounded-lg
          shadow-lg
          transition-opacity duration-500 ease-in-out
        `}
		>
			<h2 className='text-2xl font-bold mb-4'>付款資訊</h2>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='payment-method' className='block font-medium mb-2'>
						付款方式
					</label>
					<div className='flex'>
						<div className='mx-auto'>
							<input
								type='radio'
								id='online-payment'
								name='payment-method'
								value='online'
								checked={paymentMethod === 'online'}
								onChange={(e) => setPaymentMethod(e.target.value)}
								className='mr-2'
							/>
							<label htmlFor='online-payment'>線上付款</label>
						</div>
						{/* <div className='ml-[20%]'>
							<input
								type='radio'
								id='in-person-payment'
								name='payment-method'
								value='in-person'
								checked={paymentMethod === 'in-person'}
								onChange={(e) => setPaymentMethod(e.target.value)}
								className='mr-2'
							/>
							<label htmlFor='in-person-payment'>臨櫃付款</label>
						</div> */}
					</div>
				</div>

				<button
					type='submit'
					className='
                        bg-[#0466c8]
                        hover:bg-[#0466c8]/[0.8]                   
                        font-semibold
                        text-white
                        py-2
                        px-4
                        rounded
                    '
				>
					確認付款
				</button>
			</form>
		</div>
	);
}

export default Choosepay;
