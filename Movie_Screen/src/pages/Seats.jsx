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

  const { selectedTicket } = useContext(TicketContext);
  const { MID, date, time, theater } = selectedTicket;

  const location = useLocation();
  const { ticketCounts, foodCounts, totalPrice } = location.state || {};

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
          MID,
          theater
        });
        setEmptySeats(response.data);
      } catch (error) {
        console.error('Error fetching empty seats:', error);
      }
    };

    fetchEmptySeats();
  }, [MID, date, time, theater]);

  const handleSeatSelection = (selectedSeats) => {
    setSelectedSeats(selectedSeats);
  };

  // 提交訂單資訊
  const submit = async () => {
    setIsSubmitting(true);
    try {
      const bookingData = selectedSeats.map(seat_id => ({
        MID,
        seat_id,
        watch_time: time,
        watch_date: formatDate(date),
        theater
      }));

      await Promise.all(bookingData.map(data =>
        axios.post('http://localhost/Movie_Project/Movie/public/api/book-seat', data) // http://localhost:8000/api/book-seat
      ));

      navigate('/');
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
