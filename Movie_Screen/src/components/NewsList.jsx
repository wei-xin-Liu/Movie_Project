import React from 'react';
function NewsList() {
  return (
    <React.Fragment>
      <div className="flex flex-col p-2 md:p-4 md:my-8">
        <div className="flex items-center mb-4">
          <h2 className="text-3xl font-bold text-[#0466c8]">最新公告</h2>
          <a
            href="/News"
            className="text-xl font-bold text-[#0466c8]/[0.8] hover:text-blue-800 ml-4"
          >
            {' '}
            / &nbsp; 查看更多
          </a>
        </div>

        <ul className="space-y-4 pt-[2%]">
          {/* 公告項目 1 */}
          <li className="flex">
            <span className="text-white p-[1%]">
              <p className="bg-[#0466c8] p-1">2024/04/01</p>
            </span>
            <h3 className=" font-semibold text-black hover:text-blue-800 ml-4 p-[1%]">
              <a href="/New1">訂票公告</a>
            </h3>
          </li>

          {/* 公告項目 2 */}
          <li className="flex">
            <span className="text-white p-[1%]">
              <p className="bg-[#0466c8] p-1">2023/10/02</p>
            </span>
            <h3 className=" font-semibold text-black hover:text-blue-800 ml-4 p-[1%]">
              <a href="/New2">會員權益公告</a>
            </h3>
          </li>

          {/* 公告項目 3 */}
          <li className="flex">
            <span className="text-white p-[1%]">
              <p className="bg-[#0466c8] p-1">2023/09/05</p>
            </span>
            <h3 className=" font-semibold text-black hover:text-blue-800 ml-4 p-[1%]">
              <a href="/New3">會員系統例行維護公告</a>
            </h3>
          </li>

          {/* 公告項目 4 */}
          <li className="flex">
            <span className="text-white p-[1%]">
              <p className="bg-[#0466c8] p-1">2023/03/28</p>
            </span>
            <h3 className=" font-semibold text-black hover:text-blue-800 ml-4 p-[1%]">
              <a href="/New2">【反詐騙宣導】</a>
            </h3>
          </li>

          {/* 公告項目 5 */}
          <li className="flex">
            <span className="text-white p-[1%]">
              <p className="bg-[#0466c8] p-1">2023/03/27</p>
            </span>
            <h3 className=" font-semibold text-black hover:text-blue-800 ml-4 p-[1%]">
              <a href="/New3">【鄭重提醒】反詐騙公告</a>
            </h3>
          </li>

          {/* 公告項目 6 */}
          <li className="flex">
            <span className="text-white p-[1%]">
              <p className="bg-[#0466c8] p-1">2018/04/30</p>
            </span>
            <h3 className=" font-semibold text-black hover:text-blue-800 ml-4 p-[1%]">
              <a href="#">
                提醒您：影廳內、電影正片（含片尾），均禁止拍照、錄音、錄影
              </a>
            </h3>
          </li>

          {/* 公告項目 7 */}
          <li className="flex">
            <span className="text-white p-[1%]">
              <p className="bg-[#0466c8] p-1">2016/09/01</p>
            </span>
            <h3 className=" font-semibold text-black hover:text-blue-800 ml-4 p-[1%]">
              <a href="#">銀行優惠票種‧購票說明</a>
            </h3>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default NewsList;
