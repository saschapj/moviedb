import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Movie = ({moviesFromApi}) => {
const [showMovies,setShowMovies] = useState(false);

useEffect(()=>{
  setTimeout(()=>{setShowMovies(true)},1000)
})
  

  return (
    <ul className='flex flex-wrap'>
    {  moviesFromApi.map((movie)=>{
      
      return (        
        <li className={` transition ease-in-out delay-150 shadow-md hover:shadow-2xl hover:scale-110 duration-300 px-2 transition-opacity ${!showMovies && "opacity-0"}`} key={movie.id}>
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