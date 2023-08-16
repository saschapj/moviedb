import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [movies, setMovies] = useState([2]);
  const [searchTitle, setSearchTitle] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  //options here

  const getMoviesFromApi = (searchTitle) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchTitle}&include_adult=true&language=de-DE&page=1`,
      options
    )
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMoviesFromApi(searchTitle);
    console.log(movies);
  }, [searchTitle]);

  useEffect(() => {
    console.log(activeLink);
  }, [activeLink]);

  return (
    <div className="w-full  flex justify-between">
      <ul className="px-4 flex text-white text-2xl mb-8 items-center">
        <li
          onClick={(e) => {
            setActiveLink(e.target.text);
          }}
          className={`px-4 py-8 ${
            activeLink === "Home" && "text-black bg-white"
          }`}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          onClick={(e) => {
            setActiveLink(e.target.text);
          }}
          className={`px-4 py-8 ${
            activeLink === "Login" && "text-black bg-white"
          }`}
        >
          <Link to="/signin">Login</Link>
        </li>
      </ul>

      <div className="my-8 text-2xl">
        <input
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setInputFocus(false);
            }, 1000);
          }}
          className="bg-black placeholder-white border-2 border-dashed border-white"
          placeholder="suchen..."
          onChange={(e) => {
            setSearchTitle(e.target.value);
          }}
        />

        {inputFocus && (
          <ul className="text-black bg-gray-100 absolute border-2">
            {movies.map((movie) => {
              return (
                <li
                  key={movie.id}
                  className="hover:bg-white cursor-pointer bg-black text-white hover:text-black p-2 "
                >
                  <Link to={`/movie/${movie.id}`}>{movie.title}</Link>{" "}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
