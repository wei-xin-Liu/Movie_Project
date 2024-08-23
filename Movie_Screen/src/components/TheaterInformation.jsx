import React, { useState, useEffect } from 'react'
import "../css/TheaterInfo_News_Audio.css";

function TheaterInformation() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetch('http://localhost/Movie_Project/Movie/public/api/tickets')
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error('Error fetching tickets:', error));
    }, []);

    return (
        <React.Fragment>
            {/* 內容 */}
            <div className="content mt-[2%]">
                <div className="container intro w-[80%] flex">
                    <div className="introText w-[70%] float-left">
                        <h1 className="block text-[1.5em] my-[0.83em] font-bold">公司介紹</h1>
                        <div className="ms-4">
                            <div>營業人名稱： 第一影城股份有限公司</div><br />
                            <div>統一編號： 79846592</div><br />
                            <div>地址：台中市東區南京路76號</div><br />
                            <div>電話：(04)-3476-2366</div><br />
                            <div>座位數：72席</div><br />
                            第一影城斥資超過破億打造大台中地區最佳觀影環境。全台中最大巨型銀幕廳，廳高15米(約五層樓高)，寬22米，並配備全台第一台EWD雷射4K放映系統，不論在亮度、色度、對比度都是業界最高的標準，提供您畫面最細膩、色彩最鮮豔、畫質最飽滿的觀影品質。
                            <br />
                            配備Christie®Vive Audio陣列式喇叭。一體式弧線型陣列揚聲器的優勢在於能完整覆蓋全廳、提供最高的解析度、最真實的音質及高輸出的低頻效果。坐在影廳內的任何位置都能體會到這套設備所呈現的完美無瑕音場效果！
                            全台獨家的日本Kotobuki第三代尊榮商務艙雙扶手座椅，提供您業界最舒適最寬敞的觀影空間。<br />
                            全面配備TOTO馬桶，各項貼心設計都要讓您擁有最美好的觀影體驗。<br />
                            而獨家引進的LOVE廳及獨享廳更是提供您針對不同的需求、節日有更多元、更優質的電影饗宴。<br />
                        </div>
                    </div>
                    <div className="introImage w-[30%] float-right">
                        <img src="image/TheaterInfo/intro.jpg" alt="" />
                    </div>
                </div>
                <div className="container loca w-[80%] block" >
                    <h2 className="block text-[1.5em] my-[0.83em] font-bold">交通位置</h2>
                    <div className="ms-4">
                        <div><h3 className="block text-[1.17em] my-[1em] font-bold">交通方式</h3></div>
                        <p>【大眾運輸】</p><br />
                        <p>◎搭乘火車或客運，至台中火車站下車，至火車站承租騎乘機車5分鐘，即可到達台中秀泰廣場站前店</p><br />
                        <p>◎搭乘火車或客運，至台中火車站下車，沿著新民街步行，左轉復興路約10分鐘，即可到達台中秀泰廣場站前店</p><br />
                        <p>◎搭乘高鐵，至台中高鐵站下車，轉搭33、158、166、6268、6670、6737號公車，45分鐘即可到達台中秀泰廣場站前店</p><br />
                        <br />
                        <p>【自行開車】</p><br />
                        <p>◎國道1號→大雅交流道下→經台74線往太原方向→右轉自由路4段→左轉南京路→台中秀泰廣場站前店</p><br />
                        <p>◎國道3號→霧峰交流道下→經台74線往大里方向→左轉環中東路5段→旱溪西路1段→左轉振興路→右轉東光園路→左轉樂業南路→右轉建成路→左轉南京路→台中秀泰廣場站前店</p><br />
                        <p>◎搭乘火車或客運，至台中火車站下車，搭乘11路公車(綠能街車)，即可到達台中秀泰廣場站前店</p><br />
                        <br />
                        <div>公車</div><br />
                        <p>33、158、166、6268、6670、6737</p><br />
                    </div>
                    <div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7281.774924861999!2d120.68977200000002!3d24.14059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d401a8fe027%3A0x9613bfdda28aa751!2zNDAx5Y-w54Gj5Y-w5Lit5biC5p2x5Y2A5Y2X5Lqs6LevNzbomZ8!5e0!3m2!1szh-TW!2sus!4v1721112469557!5m2!1szh-TW!2sus"
                            width="100%" height="350" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <h2 className="block text-[1.5em] my-[0.83em] font-bold">票價說明</h2>
                </div>
                <div className="container intro w-[80%] flex">
                    <table className='table-fixed w-[100%] text-center h-[200px]'>
                        <thead >
                            <tr>
                                <th className=' p-[10px]'>電影版本</th>
                                <th className=' p-[10px]'>全票</th>
                                <th className=' p-[10px]'>優待票</th>
                                <th className=' p-[10px]'>早場票</th>
                                <th className=' p-[10px]'>愛心票</th>
                            </tr>
                        </thead>
                        <tbody >
                            {tickets.map(({ TID, theaters, T_Adult, T_Stud, T_Early, T_Love }) => (
                                <tr key={TID}>
                                    <td className=' p-[10px]'>{theaters.name}</td>
                                    <td className=' p-[10px]'>{T_Adult}</td>
                                    <td className=' p-[10px]'>{T_Stud}</td>
                                    <td className=' p-[10px]'>{T_Early}</td>
                                    <td className=' p-[10px]'>{T_Love}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TheaterInformation