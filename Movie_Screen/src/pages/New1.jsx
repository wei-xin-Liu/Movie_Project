import React from 'react'
import "../css/TheaterInfo_News_Audio.css";

function New1() {
    return (
        <React.Fragment>
            <div className="mx-[2%] md:mx-[10%]">
                <div className='flex mt-[2%]'>
                    <i className="fa-solid fa-calendar-days mt-[0.25%]"></i>
                    <time className="text-gray-400 tracking-[1.5px] ml-4">2024/04/01</time>
                </div>
                
                <h1 className="font-bold mt-[1%] mb-[2%] text-3xl text-[#0466c8]">MUCROWN訂票公告</h1>
                <h4 className='block text-lg font-bold mb-[2%]'>MUCROWN頂級影廳目前線上訂票僅開放「單人套票」。</h4>
                <p className='block text-lg'>如欲使用團體電影優待票、MUCROWN免費兌換券、優待票、愛心證及敬老證購票者，需至影城MUCROWN專屬櫃檯購票。
                    如尚有任何疑問，歡迎致電影城服務電話(02)8780-0800洽詢，將由專人為您服務。</p>
                <br/>
                    <button className="backTo ">
                        <a className='
                                text-[#666]
                                cursor-pointer
                                text-sm
                                w-[100px]
                                h-[40px]
                                bg-gray-300
                                border
                                rounded-sm'
                            href="News"
                        >
                            <i class="fa-solid fa-angle-left mr-[10%]"></i>
                            回上一頁
                        </a>
                    </button>
            </div>
            
        </React.Fragment>
    )
} 

export default New1