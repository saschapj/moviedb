import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase-config";
import { FaPlus } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { tmdboptions } from "../Api/Tmdb";

const MovieDetail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState([]);
  const [ownMovie, setOwnMovie] = useState(false);
  const [ownMovieId, setOwnMovieId] = useState(-1);
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

  //options here
  const options = tmdboptions
  
  const imageURL = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  const getMoviesFromApi = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=de-DE`, options)
      .then((response) => response.json())
      .then((json) => {
        setMovie(json);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMoviesFromApi(id);
  }, [id]);

  useEffect(() => {
    getOwnMovies();
    getOwnMovieId();
  }, [movie]);

  const getOwnMovies = async () => {
    const querySnapshot = await getDocs(collection(db, "movies"));
    let movieOwned = false;
    querySnapshot.forEach((doc) => {
      if (movie.id == doc.data().tmdbid) {
        movieOwned = true;
      }
    });
    setOwnMovie(movieOwned);
  };

  const getOwnMovieId = async () => {
    const querySnapshot = await getDocs(collection(db, "movies"));
    querySnapshot.forEach((doc) => {
      if (movie.id == doc.data().tmdbid) {
        setOwnMovieId(doc.id);
      }
    });
  };

  const deleteMovie = async (idToDelete) => {
    try {
      await deleteDoc(doc(db, "movies", idToDelete));
      setOwnMovie(false);
    } catch (e) {
      console.log(e);
    }
  };

  const addMovie = async (tmdbid) => {
    try {
      const docRef = await addDoc(collection(db, "movies"), {
        tmdbid: tmdbid,
      });
      console.log(`Document written with ID: ${tmdbid}`);
      setOwnMovie(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-tr from-black h-screen to-gray-600 -z-10 w-full absolute overflow-hidden">
        <img src={imageURL} className="absolute mix-blend-overlay -z-20" />
        <div className="p-16">
          <h1 className="text-4xl font-bold ">{`${movie?.title} ${
            movie.release_date?.split("-")[0]
          }`}</h1>

          {ownMovie ? (
            <button
              onClick={() => {
                deleteMovie(ownMovieId);
              }}
              className="p-4 m-2 flex border-2 min-w-[13rem] border-white text-black bg-white uppercase  hover:cursor-pointer"
            >
              {<FaPlus className=" pr-2 text-2xl " />}Film im Besitz
            </button>
          ) : (
            <button
              onClick={() => {
                addMovie(movie.id);
              }}
              className="p-4 m-2 flex border-2 min-w-[13rem] uppercase   hover:cursor-pointer"
            >
              {<FaPlus className="pr-2 text-2xl  " />}Film Hinzufügen
            </button>
          )}

          <h2 className="text-2xl font-bold">Handlung</h2>
          <p className="w-1/2">{movie?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
