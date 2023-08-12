import React, { useEffect, useState } from 'react'

const Navbar = () => {

    const [movies,setMovies] = useState([2]);
    const [searchTitle,setSearchTitle] = useState("");

        //options here


    const getMoviesFromApi = (searchTitle) => {        
        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTitle}&include_adult=true&language=de-DE&page=1`, options)
          .then(response => response.json())
          .then(json => {                              
              setMovies(json.results)              
          })
          .catch(err => console.error(err));            
      }


useEffect(()=>{
    getMoviesFromApi(searchTitle);
    console.log(movies)
},[searchTitle])

  return (
    <div className='w-full bg-white flex justify-between'>
        
        <div >
        <ul className='text-black px-4 flex'>
            <li className='px-4'>Test</li>
            <li className='px-4'>Test</li>
            <li className='px-4'>Test</li>
        </ul>
        </div>

        <div >            
            <input className='text-black' placeholder='search...' onChange={(e)=>{
                setSearchTitle(e.target.value)
                
                }}/>
            <ul className='text-black bg-gray-100 w-full absolute'>
            {movies.map((movie)=>{
                return(
                    
                    <li key={movie.id} className='hover:bg-gray-300 cursor-pointer'>{movie.title}</li>
                )
            })}
            
            </ul>            
        </div>
    </div>
  )
}

export default Navbar