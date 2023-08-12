import React, { useState } from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { useEffect } from 'react';
import {db} from "../Firebase/Firebase-config"
import Movie from '../components/Movie';


const Home = () => {

  const [moviesFromDb,setMoviesFromDb] = useState([]);
  const [moviesFromApi,setMoviesFromApi] = useState([]);
  
  
  const getMovies = async () =>{

    const querySnapshot = await getDocs(collection(db, "movies"));    

      querySnapshot.forEach((doc) => {              
                
          setMoviesFromDb((movies)=>[...movies,doc.data()]);   
             
      });  
        
  }


//options here

  
  const getMoviesFromApi = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then(response => response.json())
      .then(json => {                  
          
          setMoviesFromApi((movies)=>[...movies,json]);        

      })
      .catch(err => console.error(err));  

  
  }
  

  useEffect(()=>{
    getMovies();         
        
  },[])

  useEffect(()=> {

    moviesFromDb.map((movie)=>{
      
      getMoviesFromApi(movie.tmdbid)
    })
  },[moviesFromDb])
    
  return (    
    <div>
        <div>   
          <Movie  moviesFromDb={moviesFromDb} moviesFromApi={moviesFromApi} getMoviesFromApi={()=>{getMoviesFromApi()}}/>
        </div>
    </div>
  )
}

export default Home