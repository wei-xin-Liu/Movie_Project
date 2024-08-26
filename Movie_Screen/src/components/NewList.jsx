import React from 'react'
import "../css/TheaterInfo_News_Audio.css";

function NewList() {
    const newsItems = [
        { date: '2024/04/01', title: '訂票公告', link: '/New1' },
        { date: '2023/10/02', title: '會員權益公告', link: '/New2' },
        { date: '2023/09/05', title: '會員系統例行維護公告', link: '/New3' },
    ];

    return (
        <React.Fragment>
            <div className="mx-[10%]">
                <ul className='block list-disc my-[1em] '>
                    <h1 className="block text-[2em] my-[0.67em] font-bold text-[#0466c8]">最新公告</h1>
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
                            <time className="bg-[#0466c8] text-white p-[0.5%]">{item.date}</time>
                            <a className='pl-[1%] text-black hover:text-blue-800' href={item.link}>{item.title}</a>
                        </li>
                    ))}

                </ul>
            </div>
        </React.Fragment>
    )
}

export default NewList