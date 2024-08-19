import React, { useState, useEffect } from 'react'
import '../css/ChooseDate.css';


function ChooseDate() {
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const generateDates = () => {
            const today = new Date();
            const dayOfWeek = today.getDay();
            const daysUntilWednesday = (3 - dayOfWeek + 7) % 7; // 計算到下一個星期三的天數

            const startDate = new Date(today);
            startDate.setDate(today.getDate());

            const newDates = [];
            for (let i = 0; i < + daysUntilWednesday; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                newDates.push({
                    date: `${date.getMonth() + 1}/${date.getDate()}`,
                    day: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
                });
            }
            
            setDates(newDates);
        };

        generateDates();
    }, []);

    const handleButtonClick = (index) => {
        setActiveButtonIndex(index);
    };

    return (
        <div>
            <div className="mt-[7%] md:mt-[2%] m-[2%]">線上訂票</div>

            <div id="chooseticket" className="flex mt-[2%] ml-[5%]">
                {dates.map((item, index) => (
                    <button
                        key={index}
                        className={`w-[15%] md:w-[7%] ${activeButtonIndex === index ? 'choosedate' : ''}`}
                        onClick={() => handleButtonClick(index)}
                    >
                        <p>{item.date}</p>
                        <p>{item.day}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ChooseDate