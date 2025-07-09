import React, { useEffect, useState } from "react";

const MovieModal = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false); // for animation

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setMovieDetails(data);
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      } finally {
        setLoading(false);
        setTimeout(() => setShow(true), 10); // trigger opening animation
      }
    };

    fetchDetails();
  }, [movieId]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // match duration
  };

  if (!movieId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal content with transition */}
      <div
        className={`bg-dark-100 rounded-xl p-6 w-full max-w-2xl relative text-white transform transition-all duration-300 ease-in-out ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-white text-xl cursor-pointer"
        >
          ×
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
                className="rounded-xl w-full mask-b-from-20% mask-b-to-80%"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4 mt-[-55px]">
              {movieDetails.title}
            </h2>
            <p className="mb-2 text-light-300">{movieDetails.overview}</p>
            <p>
              <strong>Release Date:</strong> {movieDetails.release_date}
            </p>
            <p>
              <strong>Runtime:</strong> {movieDetails.runtime} min
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movieDetails.genres?.map((g) => g.name).join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
