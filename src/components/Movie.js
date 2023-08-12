import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Movie = ({moviesFromApi}) => {

  

  return (
    <ul className='flex'>
    {  moviesFromApi.map((movie)=>{
      
      return (
        <li className='px-2' key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}/>
        <div className='text-xl font-bold'>{movie.title}</div>
        </Link>
        </li>
        )
      })}
   
    </ul>

    
  )
}

export default Movie