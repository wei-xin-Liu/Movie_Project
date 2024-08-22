import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TicketContext } from '../pages/Program';

function QuickBuy() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost/Movie_Project/Movie/public/api/movieinfo');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);



    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('zh-TW', options);
    };

    const handleDateChange = (e) => {             
        setSelectedDateIdx(weekDates.findIndex((date) => {
                return date.dateString == e.target.value;          
        }) );
        setSelectedTicket({ ...selectedTicket, date: e.target.value });
    };

    const navigate = useNavigate();
    const { selectedTicket, setSelectedTicket } = useContext(TicketContext);

    // 狀態來追蹤當前選中的日期，默認選中索引0
    const [selectedDateIdx, setSelectedDateIdx] = useState(0);

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

    const [onemovie, setOneMovie] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState('');
    const [selectedTheaterId, setSelectedTheaterId] = useState('');
    const [selectedTimeId, setSelectedTimeId] = useState('');
    const [selectedMovieTitle, setSelectedMovieTitle] = useState('');

    // 獲取單部電影資訊
    useEffect(() => {
        if (selectedMovieId) {
            axios.get(`http://localhost/Movie_Project/Movie/public/api/movies/${selectedMovieId}`)
                .then(response => {
                    setOneMovie(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the movie!", error);
                });
        }
    }, [selectedMovieId]);

    // 更新選擇的票券資料
    const handleTimeClick = (time, theater) => {
        const selectedDate = selectedTicket.date || weekDates[0].dateString;
        setSelectedTicket({
            ...selectedTicket,
            date: selectedDate,
            MID: selectedMovieId,
            time,
            title: selectedMovieTitle,
            theater
        });
        navigate('/ticketing');
    };

    const handleMovieChange = (event) => {
        setSelectedMovieId(event.target.value);
    };

    const handleTheaterChange = (event) => {
        setSelectedTheaterId(event.target.value);
        // 查找所选电影的标题
        if (onemovie != null) {
            setSelectedMovieTitle(onemovie.title);
        }
    };

    const handleTimeChange = (event) => {
        setSelectedTimeId(event.target.value);
    };


    return (
        <>
            <div className="bg-gray-100 p-2 md:p-6 rounded-lg shadow-md w-full mx-auto">
                <h2 className="text-2xl font-bold mb-2 md:mb-4 text-center text-sky-900">快速訂票</h2>
                <form>
                    {/* 選擇電影 */}
                    <div className="mb-2 md:mb-4">
                        <label htmlFor="movie" className="block text-sm font-medium text-gray-700 mb-2">選擇電影</label>
                        <select
                            id="movie"
                            name="movie"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            onChange={handleMovieChange}
                            value={selectedMovieId}
                        >
                            <option value="">請選擇電影</option>
                            {movies.map(movie => (
                                <option key={movie.MID} value={movie.MID}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 選擇日期 */}
                    <div className="mb-2 md:mb-4">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">選擇日期</label>
                        <select
                            id="date"
                            name="date"
                            onChange={handleDateChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">請選擇日期</option>
                            {onemovie != null && weekDates.map((date, index) => (
                                <option
                                    key={index}  
                                    value={date.dateString}                                  
                                >
                                    {date.dateString}{date.dayString}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 選擇影城 */}
                    <div className="mb-2 md:mb-4">
                        <label htmlFor="theater" className="block text-sm font-medium text-gray-700 mb-2">選擇影城</label>
                        <select
                            id="theater"
                            name="theater"
                            onChange={handleTheaterChange}
                            className="
                                w-full 
                                p-2 border 
                                border-gray-300 
                                rounded-md 
                            ">
                            <option value="">選擇影廳</option>
                            {
                                onemovie != null && Object.keys(onemovie.theaters).map((theater, index) => (
                                    <option key={index} value={theater}>
                                        {theater}
                                    </option>)
                                )
                            }
                        </select>
                    </div>

                    {/* 選擇時間 */}
                    <div className="mb-2 md:mb-4">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">選擇時間</label>
                        <select
                            id="time"
                            onChange={handleTimeChange}
                            name="time"
                            className="
                                w-full 
                                p-2 border 
                                border-gray-300 
                                rounded-md 
                            ">
                            <option value="">選擇時間</option>
                            {
                                selectedTheaterId != '' && onemovie.theaters[selectedTheaterId].map((time, index) => {
                                    console.log(selectedDateIdx);
                                    
                                    const isPastShowtime = selectedDateIdx === 0 && (() => {
                                        const now = new Date();
                                        const [hours, minutes, seconds] = time.split(':').map(Number);
                                        const showTime = new Date();
                                        showTime.setHours(hours, minutes, seconds, 0);

                                        return now >= showTime;
                                    })();
                                    return (!isPastShowtime &&
                                        <option key={index} value={time}>
                                            {time}
                                        </option>)
                                }
                                )
                            }
                        </select>
                    </div>


                    {/* 提交按鈕 */}
                    <div>
                        <button onClick={() => handleTimeClick(selectedTimeId, selectedTheaterId)} className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">
                            立即訂票
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default QuickBuy