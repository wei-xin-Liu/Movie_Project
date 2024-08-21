import React, { useState, useEffect, createContext } from 'react';
// import axios from 'axios';
import ProgramComponent from '../components/Program';
import { useParams } from 'react-router-dom';

export const TicketContext = createContext();

function Program() {
	const [movies, setMovies] = useState(null);
	const { id } = useParams();

	// 獲取單部電影資訊
	useEffect(() => {
		axios.get(`http://localhost/Movie_Project/Movie/public/api/movies/${id}`) // http://localhost:8000/api/movies/${id}
			.then(response => {
				setMovies(response.data);
			})
			.catch(error => {
				console.error("There was an error fetching the movies!", error);
			});
	}, [id]);

	return (
		<React.Fragment>
			{movies ? <ProgramComponent {...movies} /> : <p>Loading...</p>}
		</React.Fragment>
	)
}

export default Program
