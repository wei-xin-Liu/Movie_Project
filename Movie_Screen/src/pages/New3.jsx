import React from 'react'
import "../css/TheaterInfo_News_Audio.css";

function New3() {
    return (
        <React.Fragment>
            <div class="container loca w-[80%] block">
                <time class="newsTime text-gray-400 tracking-[1.5px] p-[0.5%] mt-[2%]">2021/10/28</time>
                <h1 class="newsH1 text-[#2f96ee] block text-[2em] my-[0.67em] font-bold">會員系統例行維護公告</h1>
                <p>每週三凌晨 03:00-06:00將進行會員系統維護作業，官網及官方APP將無法進行儲值、訂票與退票，造成不便，敬請見諒。</p>
                <br/>
                    <button class="backTo">
                        <a className='
                                text-[#666]
                                cursor-pointer
                                text-sm
                                w-[100px]
                                h-[40px]
                                bg-gray-300
                                border
                                border-black
                                rounded-sm'
                            href="News"
                        >
                            回上一頁
                        </a>
                    </button>
            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </React.Fragment>
    )
}

export default New3