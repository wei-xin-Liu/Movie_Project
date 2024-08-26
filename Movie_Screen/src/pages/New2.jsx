import React from 'react'
import "../css/TheaterInfo_News_Audio.css";

function New2() {
    return (
        <React.Fragment>
            <div className="mx-[10%]">
                <time className="newsTime text-gray-400 tracking-[1.5px] p-[0.5%] mt-[2%]">2023/10/02</time>
                <h1 className="newsH1 text-[#2f96ee] block text-[2em] my-[0.67em] font-bold">iShow會員權益公告</h1>
                <p>第一影城為提供更多元便利的服務，非iShow會員無法使用線上訂票功能。原申辦網路會員者敬請於112/12/31(日)前免費辦理升級成為iShow會員，
                    逾期未升級者，網路帳號相關資料將自動刪除，恕不另行通知。</p><br/>
                <p>iShow卡號前八碼為95521010 之iShow舊式會員，敬請於112/12/31(日)前免費辦理升級為新式會員(新增儲值功能)，原帳戶所存之有效點數與贈品將一併轉入新帳號。
                    逾期未升級者，iShow舊式會員帳號相關資料(包含所有有效點數與已兌換未領取之贈品)將自動刪除、失效，恕不另行通知，為確保您的權益，敬請撥冗完成。</p><br/>
                <p>惟原持有實體iShow卡之快樂購聯合集點卡卡友權益及HAPPY GO點數累點功能將不受影響，仍可至其他HAPPY GO通路進行累點。</p><br/>
                <p>若有任何疑問，請致電影城洽詢(服務專線:
                    <a href="http://127.0.0.1:5500/intro.html">http://127.0.0.1:5500/intro.html</a>
                    )，以利後續會員相關權益執行。</p><br/>
                <p>第一影城保有對網路會員、iShow會員之申請及停用之准駁、各項服務說明及行銷活動之解釋、修改、隨時變更或終止各項服務與活動之權利。</p>
                <br/>
                    <button className="backTo">
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

export default New2