import React from 'react'
import MovieInformation from '../components/MovieInformation'
import ChooseDate from '../components/ChooseDate';
import ChooseTime from '../components/ChooseTime';

function MovieInfo() {
  
  return (
    <>
      <MovieInformation/>
      <ChooseDate />
      <ChooseTime />
    </>
  )
}

export default MovieInfo