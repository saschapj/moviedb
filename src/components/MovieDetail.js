import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const MovieDetail = () => {
    const {id} = useParams();

    const [movie,setMovie] = useState([]);
    
    //options here

    
  
  const imageURL =`https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  
  const getMoviesFromApi = (id) => {


      fetch(`https://api.themoviedb.org/3/movie/${id}?language=de-DE`, options)
        .then(response => response.json())
        .then(json => {                              
            setMovie(json)
        })
        .catch(err => console.error(err));  
        
    }

    useEffect(()=>{
        getMoviesFromApi(id);
    },[])
    
        console.log(movie)
    

      return (
        
  <div>
    <div className='bg-gradient-to-tr from-black h-screen to-gray-600 w-full absolute overflow-hidden'>
      <img src={imageURL} className='absolute mix-blend-overlay'/>
       <h1 className='text-4xl font-bold'>{`${movie?.title} ${movie.release_date?.split("-")[0]}`}</h1>
        <div>
         <h2 className='text-2xl font-bold'>Handlung</h2>
         <p className='w-1/2'>{movie?.overview}</p>
       </div>        
    </div>   
  </div>
        
    
    )
    
}

export default MovieDetail