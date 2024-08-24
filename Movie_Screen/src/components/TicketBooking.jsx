import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketContext } from '../pages/Program';
import axios from 'axios';

const TicketBooking = () => {
	const navigate = useNavigate();

	const { selectedTicket } = useContext(TicketContext);
	const { date, time, title, e_title, theater } = selectedTicket;

	const [ticketPrice, setTicketPrice] = useState([]);
	const [foods, setFoods] = useState([]);
	const [ticketCounts, setTicketCounts] = useState({
		adult: 0,
		student: 0,
		early: 0,
		love: 0,
	});
	const [foodCounts, setFoodCounts] = useState({});

	const [showSection, setShowSection] = useState(0);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// 獲取影廳票價
	useEffect(() => {
		if (theater) {
			axios
				.post('http://127.0.0.1:8000/api/get-ticket-prices', {
					theaterName: theater,
				}) // http://localhost:8000/api/get-ticket-prices
				.then((response) => setTicketPrice(response.data))
				.catch((error) =>
					console.error('Error fetching ticket prices:', error)
				);
		}
	}, [theater]);

	// 獲取食物資訊
	useEffect(() => {
		axios
			.get('	http://127.0.0.1:8000/api/foods') // http://localhost:8000/api/foods
			.then((response) => {
				setFoods(response.data);
				const initialFoodCounts = response.data.reduce((acc, food) => {
					acc[food.FID] = 0;
					return acc;
				}, {});
				setFoodCounts(initialFoodCounts);
			})
			.catch((error) => console.error('Error fetching foods:', error));
	}, []);

	// 計算總票數
	const totalTickets = Object.values(ticketCounts).reduce(
		(sum, count) => sum + count,
		0
	);

	// 是否中午過後
	const isAfterNoon = () => time >= '12:00:00';

	const ticketChange = (type, count) => {
		setTicketCounts((prevCounts) => ({ ...prevCounts, [type]: count }));
	};

	const foodChange = (FID, count) => {
		setFoodCounts((prevCounts) => ({ ...prevCounts, [FID]: count }));
	};

	// 票與食物的總價
	const totalPrice = () => {
		const ticketTotal = ticketPrice.reduce(
			(total, price) =>
				total +
				ticketCounts.adult * price.T_Adult +
				ticketCounts.student * price.T_Stud +
				ticketCounts.early * price.T_Early +
				ticketCounts.love * price.T_Love,
			0
		);

		const foodTotal = foods.reduce(
			(total, food) => total + foodCounts[food.FID] * food.price,
			0
		);

		return ticketTotal + foodTotal;
	};

	// 票與食物數量最大限制
	const selectOptions = () => {
		const options = [];
		for (let i = 0; i <= 6; i++) {
			options.push(
				<option key={i} value={i}>
					{i}
				</option>
			);
		}
		return options;
	};

	// 包裝相同布局的預約資訊
	const TicketInfo = ({ label, value }) => (
		<h1 className='flex w-full font-bold'>
			<span className='w-1/2'>{label}</span>
			<span className='w-1/2 text-rose-800'>{value}</span>
		</h1>
	);

	// 顯示多個票種資訊供選擇
	const ticketRow = (label, price, countKey) => (
		<div className='flex items-center justify-between mb-1 font-bold'>
			<span className='text-rose-800'>
				{label} NT{price}
			</span>
			<select
				value={ticketCounts[countKey]}
				onChange={(e) => ticketChange(countKey, parseInt(e.target.value))}
				className='ml-4 p-2 border border-gray-300 rounded-md'
			>
				{selectOptions()}
			</select>
		</div>
	);

	const submit = () => {
		navigate('/Seats', {
			state: {
				ticketCounts,
				foodCounts,
				totalPrice: totalPrice(),
				foods,
				title,
				e_title,
			},
		});
	};
	console.log(e_title);
	// 設置每個區塊的顯示時間
	useEffect(() => {
		const timers = [];

		for (let i = 1; i <= 4; i++) {
			timers.push(
				setTimeout(() => {
					setShowSection(i);
				}, i * 200)
			);
		}

		return () => timers.forEach((timer) => clearTimeout(timer));
	}, []);

	return (
		<div className='flex flex-col min-h-screen'>
			{/* 影片資訊區塊 */}
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
					${showSection >= 1 ? 'opacity-100' : 'opacity-0'}
				`}
			>
				<TicketInfo label='電影名稱' value={title} />
				<TicketInfo label='電影英文名稱' value={e_title} />
				<TicketInfo label='影廳' value={theater} />
				<TicketInfo label='預定日期' value={date} />
				<TicketInfo label='場次時間' value={time.substring(0, 5)} />
			</div>

			{/* 票種區塊 */}
			<div
				className={`
					mt-8
					m-auto
					w-full
					lg:w-1/5
					md:w-1/4
					sm:w-1/3
					bg-gradient-to-r
					from-yellow-400
					to-yellow-200
					p-6
					rounded-lg
					shadow-lg
					transition-opacity duration-500 ease-in-out
					${showSection >= 2 ? 'opacity-100' : 'opacity-0'}
				`}
			>
				<h2 className='text-xl font-bold text-center'>票種</h2>
				<ul>
					{ticketPrice.map(({ T_Adult, T_Stud, T_Early, T_Love }, index) => (
						<li className='flex flex-col my-2' key={index}>
							{ticketRow('全票', T_Adult, 'adult')}
							{ticketRow('學生票', T_Stud, 'student')}
							{!isAfterNoon() && ticketRow('早場票', T_Early, 'early')}
							{ticketRow('愛心票', T_Love, 'love')}
						</li>
					))}
				</ul>
			</div>

			{/* 食物區塊 */}
			<div
				className={`
					mt-8
					m-auto
					w-full
					md:w-1/2
					bg-yellow-100
					bg-dots
					bg-opacity-25
					p-6
					rounded-lg
					shadow-lg
					transition-opacity duration-500 ease-in-out
					${showSection >= 3 ? 'opacity-100' : 'opacity-0'}
				`}
			>
				<h2 className='text-xl font-bold text-center pb-4'>可選食物</h2>
				<ul className='grid grid-cols-2 gap-4'>
					{foods.map(({ FID, name, price, image }) => (
						<li
							key={FID}
							className='
								flex flex-col items-center
								bg-white p-4
								rounded-lg shadow-md
								transform transition
								duration-500 ease-in-out
								hover:animate-bounce hover:shadow-lg
								hover:shadow-yellow-400
							'
						>
							<img
								src={`/${image}`} // http://localhost:8000/${image}
								alt={name}
								className='
									w-16
									h-16
									mb-2
									rounded-full
									border-2
									border-yellow-400
								'
							/>
							<div className='text-center text-gray-700'>
								<span className='block font-semibold'>{name}</span>
								<span className='block text-yellow-600'>NT{price}</span>
							</div>
							<select
								value={foodCounts[FID]}
								onChange={(e) => foodChange(FID, parseInt(e.target.value))}
								className='mt-2 p-2 border border-gray-300 rounded-md bg-gray-50'
							>
								{selectOptions()}
							</select>
						</li>
					))}
				</ul>
			</div>

			{/* 總價與提交按鈕區塊 */}
			<div
				className={`
					my-8
					m-auto
					w-full
					md:w-1/2
					text-center
					bg-yellow-200
					p-6
					rounded-lg
					shadow-lg
					transition-opacity duration-500 ease-in-out
					${showSection >= 4 ? 'opacity-100' : 'opacity-0'}
				`}
			>
				<h3 className='text-lg font-bold text-gray-800'>
					總價格 NT{totalPrice()}
				</h3>
				<button
					disabled={totalTickets === 0}
					onClick={submit}
					className='
						bg-transparent
						hover:bg-amber-600
						text-amber-600
						font-semibold
						hover:text-white
						py-2
						px-4
						border
						border-amber-600
						hover:border-transparent
						rounded
					'
				>
					確認並選擇座位
				</button>
			</div>
		</div>
	);
};

export default TicketBooking;
