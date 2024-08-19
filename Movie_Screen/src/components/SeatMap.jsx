import React, { useState } from 'react';

const SeatMap = ({ seats, emptySeats, onSeatSelected, ticketCounts, children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seatCount = seats;
  const rows = Math.ceil(seatCount / 10);
  const seatStatus = Array(seatCount).fill(false);
  const totalSeatsRequired = Object.values(ticketCounts).reduce((sum, count) => sum + count, 0);
  const remainingSeats = totalSeatsRequired - selectedSeats.length;

  // 標記空座位（可選的灰色座位）
  emptySeats.forEach(seat => {
    seatStatus[seat.SID - 1] = true;
  });

  // 檢查座位是否可選
  const handleSeatClick = (seatNumber) => {
    if (!seatStatus[seatNumber - 1]) return;

    const updatedSelectedSeats = selectedSeats.includes(seatNumber)
      ? selectedSeats.filter(seat => seat !== seatNumber)
      : (selectedSeats.length < totalSeatsRequired ? [...selectedSeats, seatNumber] : selectedSeats);

    setSelectedSeats(updatedSelectedSeats);
    onSeatSelected(updatedSelectedSeats);
  };

  // 判斷座位狀態
  const renderSeats = () => {
    const seatElements = [];
    for (let row = 0; row < rows; row++) {
      const seatsInRow = [];
      for (let seat = 1; seat <= 10; seat++) {
        const seatNumber = row * 10 + seat;
        if (seatNumber > seatCount) break;

        const isSelected = selectedSeats.includes(seatNumber);
        const isAvailable = seatStatus[seatNumber - 1];

        seatsInRow.push(
          <div
            key={seatNumber}
            className={`
              w-8
              h-8
              flex
              items-center
              justify-center
              m-1
              cursor-pointer
              ${isAvailable ? (isSelected ? 'bg-green-500' : 'bg-gray-300') : 'bg-orange-500'}
              hover:shadow-sm
              hover:shadow-gray-500
              hover:scale-110
              transform
              transition-transform
              duration-300
              ease-in-out
            `}
            onClick={() => handleSeatClick(seatNumber)}
          >
            {seatNumber}
          </div>
        );
      }
      seatElements.push(
        <div key={row} className="flex justify-center">
          {seatsInRow}
        </div>
      );
    }
    return seatElements;
  };

  return (
    <div className="flex flex-col items-center  min-h-screen p-6">
      <div className="mb-4 text-center">
        <p className="text-lg text-gray-700 font-bold">
          <span className="text-orange-500">橘色座位</span> 不可選擇
        </p>
        <div
          className="
            border-4
            border-gray-400
            bg-gray-200
            text-gray-800
            font-bold
            py-2
            px-4
            rounded-lg
            mt-2
          "
        >
          螢幕
        </div>
      </div>

      <div
        className="
          bg-white
          p-6
          rounded-lg
          shadow-md
          w-full
          max-w-3xl
          mb-6
          overflow-x-auto
        "
      >
        <div className="inline-block min-w-full">
          {renderSeats()}
        </div>
      </div>

      {remainingSeats > 0 ? (
        <div className="text-red-600 font-bold text-lg mt-4">
          您還需要選擇 {remainingSeats} 個座位
        </div>
      ) : (
        <div className="text-green-600 font-bold text-lg mt-4">
          您已經選擇了所有座位
        </div>
      )}
      
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
};

export default SeatMap;
