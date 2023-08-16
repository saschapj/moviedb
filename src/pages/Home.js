import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { auth, db } from "../Firebase/Firebase-config";
import Movie from "../components/Movie";
import { onAuthStateChanged } from "firebase/auth";
import {tmdboptions} from "../Api/Tmdb";

const Home = () => {
  const [moviesFromDb, setMoviesFromDb] = useState([]);
  const [moviesFromApi, setMoviesFromApi] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  });

  const getMovies = async () => {
    const querySnapshot = await getDocs(collection(db, "movies"));

    querySnapshot.forEach((doc) => {
      setMoviesFromDb((movies) => [...movies, doc.data()]);
    });
  };

  //options here
  const options = tmdboptions ;

  const getMoviesFromApi = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then((response) => response.json())
      .then((json) => {
        setMoviesFromApi((movies) => [...movies, json]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    moviesFromDb.map((movie) => {
      getMoviesFromApi(movie.tmdbid);
    });
  }, [moviesFromDb]);

  return (
    <div>
      <div>
        <Movie
          moviesFromApi={moviesFromApi}
          getMoviesFromApi={() => {
            getMoviesFromApi();
          }}
        />
      </div>
    </div>
  );
};

export default Home;
