import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/MovieInformation.css';

function MovieInformation() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

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

    const toggleMovieText = () => {
        setIsExpanded(!isExpanded);
    };
 
    const movie = movies.find((movie) => {
        if (movie.MID == id) {
            return movie;
        }
    }); // Find the movie with the matching id      

    return (
        <React.Fragment>
            {movie && (
                <React.Fragment>
                    {/* Movie Information */}
                    <div className="grid grid-flow-row md:grid-cols-[15%_85%] m-[2%]">
                        <div className="rounded-b">
                            <img src={`/${movie.image}`} alt="" />
                        </div>

                        <div className="ml-[2%] mt-[2%] md:mt-[0%]">
                            <div>{movie.title}</div>
                            <div>{movie.e_title}</div>

                            <div className="grid grid-cols-[20%_80%] md:grid-cols-[5%_95%] gap-[1%] mt-[2%]">
                                <div>級別</div>
                                <div><img className="w-[10%] md:w-[2%]" src={`/${movie.rating.ratingimgurl}`} alt="Rating" /></div>

                                <div>片長</div>
                                <div>{movie.movieLength}</div>

                                <div>上映日</div>
                                <div>{movie.release_date}</div>

                                <div>類型</div>
                                <div>{movie.genre}</div>

                                <div>演員</div>
                                <div>{movie.actor}</div>

                                <div>導演</div>
                                <div>{movie.director}</div>

                                <div>簡介</div>
                                <div>
                                    <p className={`mr-[5%] movieText ${isExpanded ? 'expanded' : ''}`}>
                                        {movie.description}
                                    </p>

                                    <button onClick={toggleMovieText}
                                        className="w-[20%] md:w-[5%] border-2 border-black hover:border-black mb-[10%] md:mb-[0%]">
                                        {isExpanded ? '更少...' : '更多...'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Movie Trailer */}
                    <div className="grid grid-flow-row gap-[2%] mt-[2%] m-[2%]">
                        <div>電影預告</div>
                        <div className="bg-black">
                            <iframe className="ml-[10%] mr-[10%] w-[80%] h-[200px] md:h-[800px]"
                                src={movie.iframe} title="Trailer"></iframe>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default MovieInformation;