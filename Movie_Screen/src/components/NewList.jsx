import React from 'react'
import "../css/TheaterInfo_News_Audio.css";

function NewList() {
    const newsItems = [
        { date: '2024/04/01', title: 'MUCROWN訂票公告', link: '/New1' },
        { date: '2023/10/02', title: 'iShow會員權益公告', link: '/New2' },
        { date: '2023/09/05', title: '會員系統例行維護公告', link: '/New3' },
    ];

    return (
        <>
            <div className="container">
                <ul className='block list-disc my-[1em] px-[40px]'>
                    <h1 className="newsH1 block text-[2em] my-[0.67em] font-bold">最新公告</h1>
                    {newsItems.map((item, index) => (
                        <li
                            key={index}
                            className="
                                catNewsLi
                                border-dotted
                                border-b-2
                                border-black
                                w-[90%]
                                py-[20px]
                                tracking-[1.5px]
                            "
                        >
                            <time className="catTime bg-[#2f96ee] text-white p-[0.5%]">{item.date}</time>
                            <a className='pl-[1%] text-black' href={item.link}>{item.title}</a>
                        </li>
                    ))}

                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </ul>
            </div>
        </>
    )
}

export default NewList