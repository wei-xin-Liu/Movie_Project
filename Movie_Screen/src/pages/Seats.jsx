import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SeatMap from '../components/SeatMap';
import { TicketContext } from './Program';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import LogInCard from '../components/member/LogInCard';
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
  const { title, e_title, ticketCounts, foodCounts, totalPrice, foods } =
    location.state || {};
  const totalTicket = Object.values(ticketCounts).reduce(
    (sum, count) => sum + count,
    0,
  );

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
        const response = await axios.post(
          'http://127.0.0.1:8000/api/get-total-seats',
          {
            theater,
          },
        );
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
        const response = await axios.post(
          'http://127.0.0.1:8000/api/get-empty-seats',
          {
            show_date: formatDate(date),
            show_time: time,
            theater,
          },
        );
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
        quantity: foodCounts[FID],
      }));

    const data = {
      title: title,
      e_title: e_title,
      date: formatDate(date),
      time: time,
      theater: theater,
      ticketCounts: ticketCounts,
      selectedSeats: selectedSeats,
      selectedFoods: selectedFoods,
      totalPrice: totalPrice,
    };

    setSelectedData(data);
  }, [
    title,
    e_title,
    date,
    time,
    theater,
    ticketCounts,
    foodCounts,
    totalPrice,
    selectedSeats,
    foods,
  ]);

//   const token = localStorage.getItem('ACCESS_TOKEN'); // Check if user is logged in
//   if (!token) {
//   	return <LogInCard />;
//   }
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
          },
        );
        console.log('Response:', response);
        return response.data;
      } catch (error) {
        console.error(
          'Axios error:',
          error.response ? error.response.data : error.message,
        );
        throw error;
      }
    },
  });

  // 提交訂單資訊
  const saveOrder = () => {
    localStorage.setItem('order', JSON.stringify(selectedData));
  };
  const submit = async () => {
    const jsonData = JSON.stringify(selectedData);
    setIsSubmitting(true);
    saveOrder();
    navigate('/Choosepay', { state: selectedData });
    // try {
    // 	const bookingData = selectedSeats.map((seat_id) => ({
    // 		member_id: 1, // 用戶測試
    // 		seat_id,
    // 		watch_time: time,
    // 		watch_date: formatDate(date),
    // 		theater,
    // 	}));

    // 	await Promise.all(
    // 		bookingData.map((data) =>
    // 			axios.post('http://127.0.0.1:8000/api/book-seat', data)
    // 		)
    // 	);

    // 	// await axios.post('http://127.0.0.1:8000/api/member-order', {
    // 	// 	member_id: 2,
    // 	// 	detail: jsonData,
    // 	// 	totalPrice,
    // 	// });
    // 	const order = JSON.parse(localStorage.getItem('order'));

    // 	const { totalPrice, ...details } = order;

    // 	const data = {
    // 		detail: JSON.stringify(details),
    // 		totalPrice: parseInt(totalPrice, 10), // Ensure totalPrice is an integer
    // 	};

    // 	console.log('Data to be sent:', data); // Log the data for debugging

    // 	saveBooking.mutate(data); // Trigger the mutation

    // 	if (token) {
    // 		navigate('/Choosepay', { state: selectedData });
    // 	}
    // } catch (error) {
    // 	console.error('Error booking seats:', error);
    // 	setIsSubmitting(false);
    // }
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
