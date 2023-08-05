import React, { useEffect } from 'react'

const Movie = ({title,img}) => {



  return (
    <div className=''>
    <img src={`https://image.tmdb.org/t/p/w300${img}`}/>
    <div className=''>{title}</div>    
    </div>
  )
}

export default Movie