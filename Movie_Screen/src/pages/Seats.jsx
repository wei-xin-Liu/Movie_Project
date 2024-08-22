import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SeatMap from '../components/SeatMap';
import { TicketContext } from './Program';
// import axios from 'axios';

const Seats = () => {
	const navigate = useNavigate();

	const [totalSeats, setTotalSeats] = useState(null);
	const [emptySeats, setEmptySeats] = useState([]);

	const [selectedSeats, setSelectedSeats] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [selectedData, setSelectedData] = useState([]);

	const { selectedTicket } = useContext(TicketContext);
	const { date, time, theater } = selectedTicket;

	const location = useLocation();
	const { title, ticketCounts, foodCounts, totalPrice, foods } = location.state || {};

	const totalTicket = Object.values(ticketCounts).reduce((sum, count) => sum + count, 0);


	// 至少選擇1張票
	useEffect(() => {
		if (totalTicket === 0) {
			navigate('/ticketing');
		}
	}, [totalTicket, navigate]);

	// 日期格式轉換函數
	const formatDate = (dateStr) => {
		const [month, day] = dateStr.split('/');
		const year = new Date().getFullYear();
		return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	};

	// 獲取所有座位
	useEffect(() => {
		const fetchTotalSeats = async () => {
			try {
				const response = await axios.post('http://localhost/Movie_Project/Movie/public/api/get-total-seats', { // http://localhost:8000/api/get-total-seats
					theater
				});
				const { total_seats } = response.data;
				setTotalSeats(total_seats);
			} catch (error) {
				console.error('Error fetching total seats:', error);
			}
		};

		fetchTotalSeats();
	}, [theater]);

	// 獲取空座位
	useEffect(() => {
		const fetchEmptySeats = async () => {
			try {
				const response = await axios.post('http://localhost/Movie_Project/Movie/public/api/get-empty-seats', { // http://localhost:8000/api/get-empty-seats
					show_date: formatDate(date),
					show_time: time,
					theater
				});
				setEmptySeats(response.data);
			} catch (error) {
				console.error('Error fetching empty seats:', error);
			}
		};

		fetchEmptySeats();
	}, [date, time, theater]);

	const handleSeatSelection = (selectedSeats) => {
		setSelectedSeats(selectedSeats);
	};

	// 用戶所有選擇資訊紀錄
	useEffect(() => {
		const selectedFoods = foods
			.filter(({ FID }) => foodCounts[FID] > 0)
			.map(({ name, FID }) => ({
				name,
				quantity: foodCounts[FID]
			}));

		const data = {
			title: title,
			date: formatDate(date),
			time: time,
			theater: theater,
			ticketCounts: ticketCounts,
			selectedSeats: selectedSeats,
			selectedFoods: selectedFoods,
			totalPrice: totalPrice
		};

		setSelectedData(data);

	}, [title, date, time, theater, ticketCounts, foodCounts, totalPrice, selectedSeats, foods]);

	// 提交訂單資訊
	const submit = async () => {
		setIsSubmitting(true);
		const jsonData = JSON.stringify(selectedData);
		try {
			const bookingData = selectedSeats.map(seat_id => ({
				member_id: 1, // 用戶測試
				seat_id,
				watch_time: time,
				watch_date: formatDate(date),
				theater
			}));

			await Promise.all(bookingData.map(data =>
				axios.post('http://localhost/Movie_Project/Movie/public/api/book-seat', data) // http://localhost:8000/api/book-seat
			));

			await axios.post('http://localhost/Movie_Project/Movie/public/api/member-order', {
				member_id: 1,
				detail: jsonData,
				totalPrice
			});

			navigate('/Choosepay');
		} catch (error) {
		  console.error('Error booking seats:', error);
		  setIsSubmitting(false);
		}
	  };

	return (
		<div className="w-full">
			{totalSeats ? (
				<React.Fragment>
					<SeatMap
						seats={totalSeats}
						emptySeats={emptySeats}
						ticketCounts={ticketCounts}
						onSeatSelected={handleSeatSelection}
					>
						<button
							onClick={submit}
							className="
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
							"
							disabled={selectedSeats.length < totalTicket || isSubmitting} // 按鈕禁用條件
						>
							{isSubmitting ? '預訂中...' : '確認並預訂座位'}
						</button>
					</SeatMap>
				</React.Fragment>
			) : (
				<p className="flex justify-center">Loading...</p>
			)}
		</div>
	);
};

export default Seats;
