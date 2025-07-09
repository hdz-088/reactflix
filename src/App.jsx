import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import MovieModal from "./components/MovieModal";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  // headers: {
  //   accepts: "application/json",
  //   Authorization: `Bearer ${API_KEY}`,
  // },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&api_key=${API_KEY}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      if (data.Response === "False") {
        setErrorMsg(data.Error || "Failed to fetch movies");
        setmovieList([]);
        return;
      }
      setmovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMsg("Error Fetching Movies. Please Try Again Later!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);
  console.log(movieList);
  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-4xl text-gradient flex flex-row items-center justify-center gap-4 font-bold italic font-title title-gradient">
            <img src="./favicon.png" alt="" className="h-10 w-10" />
            ReactFlix
          </h1>
        </div>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          {/* <h2 className="mt-[40px]">All Movies</h2> */}

          {isLoading ? (
            <Spinner />
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <div className="mt-12" key={movie.id}>
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => setSelectedMovieId(movie.id)}
                  />
                </div>
              ))}
            </ul>
          )}
        </section>
        {selectedMovieId && (
          <MovieModal
            movieId={selectedMovieId}
            onClose={() => setSelectedMovieId(null)}
          />
        )}
      </div>
    </main>
  );
};

export default App;
