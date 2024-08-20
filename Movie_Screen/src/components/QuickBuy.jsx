import React, { useState, useEffect } from 'react'

function QuickBuy() {
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const generateDates = () => {
            const today = new Date();
            const dayOfWeek = today.getDay();
            const daysUntilWednesday = (dayOfWeek == 3) ? 7 : (3 - dayOfWeek + 7) % 7;

            const dateOptions = [];
            for (let i = 0; i < daysUntilWednesday; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                dateOptions.push({
                    value: date.toISOString().split('T')[0],
                    label: formatDate(date)
                });
            }

            setDates(dateOptions);
            setSelectedDate(dateOptions[0].value);
            
        };

        generateDates();
    }, []);

    
    

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('zh-TW', options);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <>
            <div className="bg-gray-100 p-2 md:p-6 rounded-lg shadow-md w-full mx-auto">
                <h2 className="text-2xl font-bold mb-2 md:mb-4 text-center font-bold text-sky-900">快速訂票</h2>
                <form>
                    {/* 選擇電影 */}
                    <div className="mb-2 md:mb-4">
                        <label htmlFor="movie" className="block text-sm font-medium text-gray-700 mb-2">選擇電影</label>
                        <select id="movie" name="movie" className="w-full p-2 border border-gray-300 rounded-md ">
                            <option value="">請選擇電影</option>
                            <option value="movie1">玩命關頭10</option>
                            <option value="movie2">復仇者聯盟：終局之戰</option>
                            <option value="movie3">魔髮精靈</option>
                        </select>
                    </div>

                    {/* 選擇日期 */}
                    <div className="mb-2 md:mb-4">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">選擇日期</label>
                        <select
                            id="date"
                            name="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            {dates.map((date) => (
                                <option key={date.value} value={date.value}>
                                    {date.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 選擇時間 */}
                    <div className="mb-2 md:mb-4">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">選擇時間</label>
                        <select id="time" name="time" className="w-full p-2 border border-gray-300 rounded-md ">
                            <option value="">請選擇時間</option>
                            <option value="1400">14:00</option>
                            <option value="1630">16:30</option>
                            <option value="1900">19:00</option>
                            <option value="2130">21:30</option>
                        </select>
                    </div>

                    {/* 提交按鈕 */}
                    <button
                        type="submit"
                        className="
                            w-full
                            bg-indigo-600
                            text-white
                            p-2
                            rounded-md
                            hover:bg-indigo-700
                            font-bold
                        "
                    >
                        立即訂票
                    </button>
                </form>
            </div>
        </>
    )
}

export default QuickBuy