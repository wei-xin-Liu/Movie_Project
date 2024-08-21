import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketContext } from '../pages/Program';

import '../css/MovieInformation.css';

function Program({
	MID,
	title,
	description,
	director,
	genre,
	release_date,
	movieLength,
	grade,
	actor,
	image,
	iframe,
	e_title,
	theaters,
	rating,
}) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleMovieText = () => {
		setIsExpanded(!isExpanded);
	};

	const navigate = useNavigate();
	const { selectedTicket, setSelectedTicket } = useContext(TicketContext);

	// 狀態來追蹤當前選中的日期，默認選中索引0
	const [selectedDateIdx, setSelectedDateIdx] = useState(0);
	const [hoveredDateIdx, setHoveredDateIdx] = useState(null);

	// 從今天開始的未來7天供用戶選擇
	const getWeekDates = () => {
		const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
		const dates = [];
		const today = new Date();

		for (let i = 0; i < 7; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);
			const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
			const dayString = weekDays[date.getDay()];
			dates.push({ dateString, dayString });
		}

		return dates;
	};

	const weekDates = getWeekDates();

	// 當組件加載時，默認設置選中的日期為第一個日期
	useEffect(() => {
		setSelectedTicket({ ...selectedTicket, date: weekDates[0].dateString });
	}, []);

	// 更新當前選中的日期狀態
	const handleDateClick = (index, dateString) => {
		setSelectedDateIdx(index);
		setSelectedTicket({ ...selectedTicket, date: dateString });
	};

	// 更新選擇的票券資料
	const handleTimeClick = (time, theater) => {
		const selectedDate = selectedTicket.date || weekDates[0].dateString;
		setSelectedTicket({
			...selectedTicket,
			date: selectedDate,
			MID,
			time,
			title,
			theater
		});
		navigate('/ticketing');
	};

	return (
		<div className="font-sans p-[2%]">
			<div className="grid grid-flow-row sm:grid-cols-[15%_85%]">
				<div className="rounded-b">
					<img src={`/${image}`} alt={title} />
				</div>

				<div className="ml-[2%] mt-[2%] sm:mt-[0%]">
					<h1 className="font-bold">{title}</h1>
					<h1>{e_title}</h1>
					<div className="grid grid-cols-[20%_80%] sm:grid-cols-[5%_95%] gap-[1%] mt-[2%] font-bold">
						<h1 className="text-teal-800">級別</h1><div><img className="w-[10%] md:w-[2%]" src={`/${rating.ratingimgurl}`} alt={rating.ratingiddesc} /></div>
						<h1 className="text-teal-800">片長</h1><div>{movieLength}分鐘</div>
						<h1 className="text-teal-800">上映日</h1><div>{release_date}</div>
						<h1 className="text-teal-800">類型</h1><div>{genre}</div>
						<h1 className="text-teal-800">演員</h1><div>{actor}</div>
						<h1 className="text-teal-800">導演</h1><div>{director}</div>
						<h1 className="text-teal-800">簡介</h1>
						<div>
							<p id="movieText" className={`text-sky-900 mr-[5%] movieText ${isExpanded ? 'expanded' : ''}`}>
								{description}
							</p>
							<button
								id="btnmovieText"
								onClick={toggleMovieText}
								className="
									w-[20%]
									sm:w-[5%]
									border-2
									border-indigo-500
									hover:bg-indigo-500
									mb-[10%]
									md:mb-[0%]
									font-bold
								"
							>
								{isExpanded ? '更少...' : '更多...'}
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-flow-row gap-[2%] mt-[2%]">
				<div>電影預告</div>
				<div className="bg-black">
					<iframe className="ml-[10%] mr-[10%] w-[80%] h-[200px] sm:h-[800px]"
						src={iframe}></iframe>
				</div>
			</div>

			<div className="mt-[7%] sm:mt-[2%]">線上訂票</div>

			<div id="chooseticket" className="flex mt-[2%] ml-[5%]">
				{weekDates.map(({ dateString, dayString }, index) => (
					<button
						key={index}
						className={`w-[15%] sm:w-[7%] choosedate
            ${selectedDateIdx === index ? 'bg-indigo-500 text-white' : ''}
            ${hoveredDateIdx === index && selectedDateIdx !== index ? 'bg-gray-300' : ''}`}
						onClick={() => handleDateClick(index, dateString)}
						onMouseEnter={() => setHoveredDateIdx(index)}
						onMouseLeave={() => setHoveredDateIdx(null)}
					>
						<p>{dateString}</p>
						<p>{dayString}</p>
					</button>
				))}
			</div>

			<div className="mt-[2%] ml-[5%]">
				{Object.keys(theaters).map((theater, index) => (
					<div key={index} className="mb-[2%]">
						<h3>{theater}</h3>
						<div className="flex flex-wrap">
							{theaters[theater].map((time, idx) => {
								// 只有當日且時間已過的按鈕會禁用
								const isPastShowtime = selectedDateIdx === 0 && (() => {
									const now = new Date();
									const [hours, minutes, seconds] = time.split(':').map(Number);
									const showTime = new Date();
									showTime.setHours(hours, minutes, seconds, 0);

									return now >= showTime;
								})();

								return (
									<button
										key={idx}
										onClick={() => handleTimeClick(time, theater)}
										disabled={isPastShowtime}
										className={`
											w-[30%]
											sm:w-[10%]
											text-center
											mr-[1.1%]
											mb-[1.1%]
											border-2
											border-indigo-500
											hover:scale-[1.1]
											hover:bg-indigo-500
											${isPastShowtime ? 'opacity-50 cursor-not-allowed' : ''}
										`}
									>
										{time.substring(0, 5)}
									</button>
								);
							})}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Program;
