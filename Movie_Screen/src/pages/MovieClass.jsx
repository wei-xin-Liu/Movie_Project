import React, { useState, useEffect } from 'react';

function MovieClassName() {
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

    const CategoryButton = ({ category, label }) => (
        <button
            className={`font-bold text-sky-900 bg-blue-400 mb-4 mr-4 w-28 h-10 ${selectedCategory === category ? 'bg-blue-600' : ''}`}
            onClick={() => setSelectedCategory(category)}
        >
            {label}
        </button>
    );

    return (
        <React.Fragment>
            <div className="ml-8 mt-8">
                <CategoryButton category="熱映中" label="熱映中" />
                {/* <CategoryButton category="即將上映" label="即將上映" /> */}
            </div>

            <div className="ml-8 mt-4">
                {['全部', '動作', '劇情', '驚悚', '動畫'].map(category => (
                    <CategoryButton key={category} category={category} label={category} />
                ))}
                {/* <CategoryButton category="即將入場" label="即將入場" /> */}
            </div>

            <div className="grid grid-flow-row md:grid-cols-5 gap-4 p-8">
                {filterMovies().map(({ MID, image, title, rating, e_title, release_date }) => (
                    <a href={`/program/${MID}`} key={MID} className="no-underline">
                        <div
                            className="
                                flex
                                flex-col
                                h-full
                                bg-white
                                rounded
                                text-gray-500
                                shadow-md
                                relative
                                transition-transform
                                hover:translate-y-[-5px]
                            "
                        >
                            <img className="w-full h-64 rounded-b object-cover" src={image} alt={title} />
                            <div className="flex justify-between">
                                <p className="w-1/2 text-2xl py-2 pl-3 text-black font-bold text-sky-900">{title}</p>
                                <img className="h-16 p-2" src={rating.ratingimgurl} alt={rating.ratingdesc} />
                            </div>
                            <div className="grow" />
                            <div>
                                <p className="text-1xl pl-3">{e_title}</p>
                            </div>
                            <div className="content-center">
                                <p className="text-1xl pl-3">上映日期：{release_date}</p>
                            </div>
                            <div className="content-center">
                                <button
                                    className="
                                        w-full
                                        bg-indigo-600
                                        text-white
                                        p-2
                                        rounded-md
                                        hover:bg-indigo-700
                                        font-bold
                                    "
                                >
                                    線上訂票
                                </button>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </React.Fragment>
    );
}

export default MovieClassName;
