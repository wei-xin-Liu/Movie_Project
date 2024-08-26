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
	actor,
	image,
	iframe,
	e_title,
	theaters,
	rating,
}) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [selectedDateIdx, setSelectedDateIdx] = useState(0);
	const [hoveredDateIdx, setHoveredDateIdx] = useState(null);

	const { selectedTicket, setSelectedTicket } = useContext(TicketContext);
	const navigate = useNavigate();
	const toggleMovieText = () => setIsExpanded(!isExpanded);

	// 從今天開始的未來7天供用戶選擇
	const getWeekDates = () => {
		const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
		return Array.from({ length: 7 }, (_, i) => {
			const date = new Date();
			date.setDate(date.getDate() + i);
			return {
				dateString: `${date.getMonth() + 1}/${date.getDate()}`,
				dayString: weekDays[date.getDay()],
			};
		});
	};

	const weekDates = getWeekDates();

	useEffect(() => {
		setSelectedTicket({ ...selectedTicket, date: weekDates[0].dateString });
	}, []);

	const handleDateClick = (index, dateString) => {
		setSelectedDateIdx(index);
		setSelectedTicket({ ...selectedTicket, date: dateString });
	};

	const handleTimeClick = (time, theater) => {
		const selectedDate = selectedTicket.date || weekDates[0].dateString;
		setSelectedTicket({
			...selectedTicket,
			date: selectedDate,
			MID,
			time,
			title,
			e_title,
			theater,
		});
		navigate('/ticketing');
	};

	const InfoRow = ({ label, children }) => (
		<div className="flex mb-2">
			<h1 className="text-sky-900 w-[15%] sm:w-[12%] md:w-[10%]">{label}</h1>
			<div className="text-gray-500 w-[85%] sm:w-[88%] md:w-[90%]">{children}</div>
		</div>
	);

	return (
		<div className="font-sans p-[2%] md:mx-20">
			<div className="flex flex-col sm:flex-row sm:space-x-4">
				<div className="flex justify-center rounded-b sm:w-[25%]">
					<img
						src={`/${image}`}
						alt={title}
						className="h-[400px] sm:h-[200px] md:h-[300px] lg:h-[350px] object-cover"
					/>
				</div>
				<div className="sm:w-[75%] mt-[2%] sm:mt-[0%]">
					<h1 className="font-bold text-red-900 text-xl w-[30%] sm:w-[35%] md:w-[20%]">{title}</h1>
					<h1 className="text-red-600 text-xs w-[30%] sm:w-[35%] md:w-[20%]">{e_title}</h1>
					<div className="mt-[2%] font-bold">
						<InfoRow label="級別">
							<img
								className='w-[50px] md:w-[40px] sm:w-[30px]'
								src={`/${rating.ratingimgurl}`}
								alt={rating.ratingiddesc}
							/>
						</InfoRow>
						<InfoRow label='片長'>{movieLength}分鐘</InfoRow>
						<InfoRow label='上映日'>{release_date}</InfoRow>
						<InfoRow label='類型'>{genre}</InfoRow>
						<InfoRow label='演員'>{actor}</InfoRow>
						<InfoRow label='導演'>{director}</InfoRow>
						<InfoRow label='簡介'>
							<p
								id="movieText"
								className={`mr-[5%] movieText ${isExpanded ? 'expanded' : ''
									}`}
							>
								{description}
							</p>
							<button
								id='btnmovieText'
								onClick={toggleMovieText}
								className='
									min-w-[100px]
									w-[30%]
									sm:min-w-[60px]
									sm:w-[20%]
									border-2
									border-indigo-500
									hover:bg-indigo-500
									mb-[10%]
									md:mb-[0%]
									font-bold
									text-xs
									overflow-hidden
									truncate
									text-center
								'
							>
								{isExpanded ? '更少...' : '更多...'}
							</button>
						</InfoRow>
					</div>
				</div>
			</div>

			<div className="grid grid-flow-row gap-[2%] mt-[2%]">
				<h1 className="bg-slate-50 border-t border-gray-300 py-2">
					<p className="text-xl font-bold ps-5">電影預告</p>
				</h1>
			</div>
			<div className="bg-black">
				<iframe
				className="ml-[10%] mr-[10%] w-[80%] h-[200px] sm:h-[400px] md:h-[600px] lg:h-[800px]"
				src={iframe}
				></iframe>
			</div>
			<div className="bg-slate-50 border-b border-gray-300 py-2">
				<p className="text-xl font-bold ps-5">線上訂票</p>
			</div>

			<div
				id='chooseticket'
				className='flex mt-[2%] ml-[5%] overflow-x-auto whitespace-nowrap'
			>
				{weekDates.map(({ dateString, dayString }, index) => (
					<button
						key={index}
						className={`
							min-w-[100px]
							sm:min-w-[80px]
							w-auto
							sm:w-auto
							choosedate
							inline-block
							px-2
							${selectedDateIdx === index ? 'bg-indigo-500 text-white' : 'text-red-900'
							} ${hoveredDateIdx === index && selectedDateIdx !== index
								? 'bg-gray-300'
								: ''
							}`}
						onClick={() => handleDateClick(index, dateString)}
						onMouseEnter={() => setHoveredDateIdx(index)}
						onMouseLeave={() => setHoveredDateIdx(null)}
					>
						<p className="font-bold whitespace-nowrap">{dateString}</p>
						<p className="font-bold whitespace-nowrap">{dayString}</p>
					</button>
				))}
			</div>

			<div className='mt-[2%] ml-[5%]'>
				{Object.keys(theaters).map((theater, index) => (
					<div key={index} className='mb-[2%]'>
						<h3 className='font-bold'>{theater}</h3>
						<div className='flex flex-wrap'>
							{theaters[theater].map((time, idx) => {
								const isPastShowtime =
									selectedDateIdx === 0 &&
									(() => {
										const now = new Date();
										const [hours, minutes, seconds] = time
											.split(':')
											.map(Number);
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
											min-w-[80px]
											sm:min-w-[50px]
											w-[30%]
											sm:w-[10%]
											text-center
											mr-[1.1%]
											mb-[1.1%]
											border-2
											border-indigo-500
											hover:scale-[1.1]
											hover:bg-indigo-500
											truncate ${isPastShowtime ? 'opacity-50 cursor-not-allowed' : ''}`}
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
