import React from 'react';

function ChooseTime() {
    const times = [
        '13:20', '14:20', '14:20', '14:20', '14:20',
        '14:20', '15:20', '16:20', '17:20', '17:20',
        '17:20', '17:20', '17:20', '17:20', '17:20'
    ];

    const TimeButton = ({ time }) => (
        <button
            className="w-[30%] md:w-[10%] text-center mr-[1.1%] mb-[1.1%] border-2 border-black hover:scale-[1.1] hover:border-black"
        >
            {time}
        </button>
    );

    return (
        <React.Fragment>
            <div className="grid grid-cols-[20%_20%_60%] md:grid-cols-[8%_8%_70%] mt-[2%] ml-[5%]">
                <div className="content-center">
                    <p className="text-center">丹普廳</p>
                </div>

                <div className="content-center">
                    <p className="text-center">2D英語</p>
                </div>

                <div className="ml-[2%]">
                    {times.map((time, index) => (
                        <TimeButton key={index} time={time} />
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default ChooseTime;
