import React, { useEffect } from 'react'

const Movie = ({title,img,moviesFromApi}) => {


  

  
  return (
    <ul className='flex'>
    {  moviesFromApi.map((movie)=>{
      console.log(moviesFromApi)
      return (
        <li className='px-2' key={movie.id}>
        <img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}/>
        <div>{movie.title}</div>
        </li>
        )
      })}
    <div className=''>{title}</div>    
    </ul>
  )
}

export default Movie