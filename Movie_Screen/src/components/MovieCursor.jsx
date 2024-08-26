import React, { useState, useEffect } from 'react'

function MovieCursor() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        "/image/MovieCursor/6c837413e055e5d7e98cfd755c07ef8b.jpg",
        "/image/MovieCursor/073d0a919fc3c0660836f38bc44a1ed1.jpg",
        "/image/MovieCursor/6279ddcbc5286e2bb4823b465d4de976.jpg",
        "/image/MovieCursor/923d734be93a1d1366d42372265416f3.jpg", 
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <React.Fragment>
            <div className="flex justify-center">

                {/* 導航按鈕 */}
                <button onClick={prevSlide} className="w-[10%] hover:bg-white/50 text-black p-2">
                    <svg className="w-3 mx-auto md:w-24 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                <div className="w-[80%] overflow-hidden rounded-lg shadow-lg">
                    <div className="flex transition-transform duration-500 ease-in-out " style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {/* 輪播項目 */}
                        {slides.map((slide, index) => (
                            <div key={index} className="w-full flex-shrink-0" style={{ aspectRatio: '17/4' }}>
                                <img src={slide} alt={`Slide ${index + 1}`} className="object-cover" />
                            </div>                               
                        ))}
                    </div>
                </div>

                <button onClick={nextSlide} className="w-[10%] hover:bg-white/50 text-black p-2">
                    <svg className="w-3 mx-auto md:w-24 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </React.Fragment>
    )
}

export default MovieCursor