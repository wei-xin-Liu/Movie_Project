import React, { useState } from 'react'

function MyHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // console.log(isMobileMenuOpen); 

  const openMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-blue-600 text-white m-0 p-4">
      <div className="flex justify-between items-center h-10">
        <div className="font-bold w-40 text-center"><div><a href="/">第一影城</a></div></div>
        <div className="hidden md:flex space-x-4">
          <div><a href="/News" className=" hover:text-gray-300">最新公告</a></div>
          <div><a href="/MovieClass" className=" hover:text-gray-300">電影資訊</a></div>
          <div><a href="/TheaterInfo" className=" hover:text-gray-300">影城介紹</a></div>
          <div className="w-52 text-center"><a href="#" className=" hover:text-gray-300">登入第一影城</a></div>
        </div>
        <button className="md:hidden focus:outline-none" onClick={openMenu}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-blue-600 z-40 items-center justify-center">
          <button className="absolute top-4 right-4 focus:outline-none" onClick={closeMenu}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <nav className="text-center">
            <a href="/News" className="block text-2xl hover:bg-blue-600 px-4 py-2 mb-4 mt-8">最新公告</a>
            <a href="/MovieClass" className="block text-2xl hover:bg-blue-600 px-4 py-2 mb-4">電影資訊</a>
            <a href="/TheaterInfo" className="block text-2xl hover:bg-blue-600 px-4 py-2 mb-4">影城介紹</a>
            <a href="#" className="block text-2xl hover:bg-blue-600 px-4 py-2 mb-4">登入第一影城</a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default MyHeader