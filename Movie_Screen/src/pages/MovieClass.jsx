import React, { useState, useEffect } from 'react'

function MovieclassName() {
    const [movies, setMovies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('全部');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost/Movie_Project/Movie/public/api/movieinfo');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const filterMovies = () => {
        if (selectedCategory === '全部') {
            return movies;
        } else {
            return movies.filter(movie => movie.genre.includes(selectedCategory));
        }
    };

    return (
        <>
            <div className="ml-8 mt-8">
                <button className={`bg-blue-400 mr-4 w-28 h-10 ${selectedCategory === '熱映中' ? 'bg-blue-600' : ''}`} onClick={() => setSelectedCategory('熱映中')}>
                    熱映中
                </button>
                {/* <button className={`bg-blue-400 mr-4 w-28 h-10 ${selectedCategory === '即將上映' ? 'bg-blue-600' : ''}`} onClick={() => setSelectedCategory('即將上映')}>
                    即將上映
                </button> */}
            </div>

            <div className="ml-8 mt-4">
                <button className={`bg-blue-400 mb-4 mr-4 w-28 h-10 ${selectedCategory === '全部' ? 'bg-blue-600' : ''}`} onClick={() => setSelectedCategory('全部')}>
                    全部
                </button>
                <button className={`bg-blue-400 mb-4 mr-4 w-28 h-10 ${selectedCategory === '動作' ? 'bg-blue-600' : ''}`} onClick={() => setSelectedCategory('動作')}>
                    動作
                </button>
                <button className={`bg-blue-400 mb-4 mr-4 w-28 h-10 ${selectedCategory === '劇情' ? 'bg-blue-600' : ''}`} onClick={() => setSelectedCategory('劇情')}>
                    劇情
                </button>
                <button className={`bg-blue-400 mb-4 mr-4 w-28 h-10 ${selectedCategory === '驚悚' ? 'bg-blue-600' : ''}`} onClick={() => setSelectedCategory('驚悚')}>
                    驚悚
                </button>
                <button className={`bg-blue-400 mb-4 mr-4 w-28 h-10 ${selectedCategory === '動畫' ? 'bg-blue-600' : ''}`} onClick={() => setSelectedCategory('動畫')}>
                    動畫
                </button>
                {/* <button className={`bg-blue-400 mb-4 mr-4 w-28 h-10 ${selectedCategory === '即將入場' ? 'bg-blue-600' : ''}`} onClick={() => setSelectedCategory('即將入場')}>
                    即將入場
                </button> */}
            </div>

            <div className="grid grid-flow-row md:grid-cols-5 gap-4 p-8">
                {filterMovies().map((movie) => (
                    <a href={`/program/${movie.MID}`} key={movie.MID} className="no-underline">
                        <div className="bg-white rounded text-gray-500 shadow-md relative transition-transform hover:translate-y-[-5px]">
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
                                <div className="content-center">
                                    <button className="bg-blue-400 w-full h-full text-black">線上訂票</button>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
}

export default MovieclassName;