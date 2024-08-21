import React from 'react'
import MovieInformation from '../components/MovieInformation'
import ChooseDate from '../components/ChooseDate';
import ChooseTime from '../components/ChooseTime';

function MovieInfo() {

	return (
		<React.Fragment>
			<MovieInformation />
			<ChooseDate />
			<ChooseTime />
		</React.Fragment>
	)
}

export default MovieInfo
