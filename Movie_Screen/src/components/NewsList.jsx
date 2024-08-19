import React from 'react'

function NewsList() {
    return (
        <>
            <div className="mx-auto">
                <div className="flex mb-[2%] w-[448px]">
                    <h2 className="text-3xl font-bold text-blue-800">最新公告</h2>
                    {/* 查看更多按鈕 */}
                    <div className="text-2xl pt-[1%] ml-[5%]">
                        <a href="/News" className="text-black hover:text-blue-800">查看更多公告</a>
                    </div>
                </div>


                <ul className="space-y-4">
                    {/* 公告項目 1 */}
                    <li className="flex">
                        <span className=" text-gray-500 mr-[5%]">2024/04/01</span>
                        <h3 className=" font-semibold text-black hover:text-blue-800">
                            <a href="/New1">MUCROWN訂票公告</a>
                        </h3>
                    </li>

                    {/* 公告項目 2 */}
                    <li className="flex">
                        <span className=" text-gray-500 mr-[5%]">2023/10/02</span>
                        <h3 className=" font-semibold text-black hover:text-blue-800">
                            <a href="/New2">iShow會員權益公告</a>
                        </h3>
                    </li>

                    {/* 公告項目 3 */}
                    <li className="flex">
                        <span className=" text-gray-500 mr-[5%]">2023/09/05</span>
                        <h3 className=" font-semibold text-black hover:text-blue-800">
                            <a href="/New3">會員系統例行維護公告</a>
                        </h3>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default NewsList