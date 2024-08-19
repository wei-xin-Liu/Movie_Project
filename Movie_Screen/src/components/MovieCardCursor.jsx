import React, { useState, useEffect } from 'react'

function MovieCardCursor() {
    const [movieGroups, setMovieGroups] = useState([]);
    const [movieGroups2, setMovieGroups2] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost/Movie_Project/Movie/public/api/movieinfo');
                // 假設 API 返回一個大的電影數組
                const allMovies = response.data;

                setMovies(allMovies);
                // 將電影分組，每組4部電影
                const groups = [];
                for (let i = 0; i < allMovies.length; i += 4) {
                    groups.push(allMovies.slice(i, i + 4));
                }
                setMovieGroups(groups);

                const groups2 = [];
                for (let i = 0; i < allMovies.length; i += 2) {
                    groups2.push(allMovies.slice(i, i + 2));
                }
                setMovieGroups2(groups2);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);



    const [currentIndex1, setCurrentIndex1] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(0);

    const nextSlide1 = () => {
        setCurrentIndex1((prevIndex) => (prevIndex + 1) % Math.ceil(movies.length / 4));
    };

    const prevSlide1 = () => {
        setCurrentIndex1((prevIndex) => (prevIndex - 1 + Math.ceil(movies.length / 4)) % Math.ceil(movies.length / 4));
    };

    const nextSlide2 = () => {
        setCurrentIndex2((prevIndex) => (prevIndex + 1) % Math.ceil(movies.length / 2));
    };

    const prevSlide2 = () => {
        setCurrentIndex2((prevIndex) => (prevIndex - 1 + Math.ceil(movies.length / 2)) % Math.ceil(movies.length / 2));
    };




    return (
        <>
            <div className="flex justify-center">
                {/* 導航按鈕 */}
                <button onClick={prevSlide1} className=" hover:bg-white/50 text-black p-2 hidden md:block">
                    <svg className="w-3 md:w-24 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                <div id="moviecarousel1" className="md:w-[90%] overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex1 * 100}%)` }}>
                        {/* 輪播項目 */}
                        {movieGroups.map((group, index) => (
                            <div key={index} className="w-full flex-shrink-0 hidden md:block">
                                <div className="grid md:grid-cols-4 gap-4 p-8">
                                    {group.map((movie) => (
                                        <a href={`/program/${movie.MID}`} key={movie.MID} className="no-underline">
                                            <div key={movie.MID} className="bg-white rounded text-gray-500 shadow-md relative transition-transform hover:translate-y-[-5px]">
                                                <div className="w-full aspect-[0.70]">
                                                    <img className="w-full h-full rounded-b object-cover" src={movie.image} alt={movie.title} />
                                                </div>
                                                <div className="grid grid-rows-4">
                                                    <div>
                                                        <img className="absolute right-0 w-12 p-2" src={movie.rating.ratingimgurl} alt={movie.rating.ratingdesc} />
                                                        <p className="text-2xl py-2 pl-3 text-black">{movie.title}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-1xl pl-3">{movie.e_title}</p>
                                                    </div>
                                                    <div className="content-center">
                                                        <p className="text-1xl pl-3">上映日期：{movie.release_date}</p>
                                                    </div>
                                                    <div>
                                                        <button className="bg-blue-400 w-full h-full text-black">線上訂票</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={nextSlide1} className=" hover:bg-white/50 text-black p-2 hidden md:block">
                    <svg className="w-3 md:w-24 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>




            <div className="flex justify-center mx-auto">
                {/* 導航按鈕 */}
                <button onClick={prevSlide2} className=" hover:bg-white/50 text-black p-2 md:hidden">
                    <svg className="w-3 md:w-24 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                <div id="moviecarousel2" className="md:w-[90%] overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex2 * 100}%)` }}>
                        {/* 輪播項目 */}
                        {movieGroups2.map((group, index) => (
                            <div key={index} className="w-full flex-shrink-0 md:hidden">
                                <div className="grid grid-cols-2 gap-2">
                                    {group.map((movie) => (
                                        <a href={`/program/${movie.MID}`} key={movie.MID} className="no-underline">
                                            <div key={movie.MID} className="bg-white rounded text-gray-500 shadow-md relative transition-transform hover:translate-y-[-5px]">
                                                <div className="w-full aspect-[0.70]">
                                                    <img className="w-full h-full rounded-b object-cover" src={movie.image} alt={movie.title} />
                                                </div>
                                                <div className="grid grid-rows-4">
                                                    <div>
                                                        <p className="text-black">{movie.title}</p>
                                                    </div>
                                                    <div>
                                                        <p className="">{movie.e_title}</p>
                                                    </div>
                                                    <div className="content-center">
                                                        <p className="">上映日期：{movie.release_date}</p>
                                                    </div>
                                                    <div className="content-center">
                                                        <button className="bg-blue-400 w-full h-full text-black">線上訂票</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={nextSlide2} className=" hover:bg-white/50 text-black p-2 md:hidden">
                    <svg className="w-3 md:w-24 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </>

    )
}

export default MovieCardCursor