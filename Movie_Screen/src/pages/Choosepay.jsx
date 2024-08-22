import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Choosepay() {
	const { state } = useLocation();

	let itemDescArray = '';
	const { selectedFoods, ticketCounts, totalPrice } = state;
	for (let index = 0; index < selectedFoods.length; index++) {
		itemDescArray += `${selectedFoods[index].name}x${selectedFoods[index].quantity}, `;
	}
	const entries = Object.entries(ticketCounts);
	const filteredEntries = entries.filter(([key, value]) => value > 0);
	filteredEntries.map(([key, value]) => (itemDescArray += `${key}x${value}, `));

	const totalPricestr = totalPrice.toString();

	const [paymentMethod, setPaymentMethod] = useState('online');
	const [data, setData] = useState([]);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault(); // 阻止表單默認提交行為

		try {
			const response = await axios.post('http://127.0.0.1:8000/api/bluepay', {
				itemDescArray,
				totalPricestr,
			});

			setData(response.data); // 保存數據到狀態

			// 立即導航到新頁面，並傳遞數據
			navigate('/Bluepay', { state: { data: response.data } });
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
						<div className='ml-[20%]'>
							<input
								type='radio'
								id='online-payment'
								name='payment-method'
								value='online'
								checked={paymentMethod === 'online'}
								onChange={(e) => setPaymentMethod(e.target.value)}
								className='mr-2'
							/>
							<label htmlFor='online-payment'>信用卡付款</label>
						</div>
						<div className='ml-[20%]'>
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
						</div>
					</div>
				</div>

				<button
					type='submit'
					className='
                        bg-transparent
                        hover:bg-teal-600
                        text-teal-600
                        font-semibold
                        hover:text-white
                        py-2
                        px-4
                        border
                        border-teal-600
                        hover:border-transparent
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
