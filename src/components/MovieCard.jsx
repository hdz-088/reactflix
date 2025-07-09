// import React from "react";

// const MovieCard = ({
//   movie: { title, vote_average, poster_path, release_date, original_language },
// }) => {
//   return (
//     <div className="movie-card">
//       <img
//         src={
//           poster_path
//             ? `https://image.tmdb.org/t/p/w500/${poster_path}`
//             : `/no-movie.png`
//         }
//         alt="{title}"
//       />
//       <div className="mt-4">
//         <h3>{title}</h3>
//         <div className="content">
//           <div className="rating">
//             <img src="./star.svg" alt="Star Icon" />
//             <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
//           </div>
//           <span>•</span>
//           <p className="lang">{original_language}</p>
//           <span>•</span>
//           <p className="year">
//             {release_date ? release_date.split("-")[0] : "N/A"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;

import React, { useRef } from "react";

// const MovieCard = ({
//   movie: { title, vote_average, poster_path, release_date, original_language },
// }) => {
//   const cardRef = useRef(null);
const MovieCard = ({ movie, onClick }) => {
  const { title, poster_path, vote_average, release_date, original_language } =
    movie;
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="movie-card"
      onClick={onClick}
    >
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : `/no-movie.png`
        }
        alt={title}
        className="rounded-xl"
      />
      <div className="mt-4 relative z-10">
        <h3>{title}</h3>
        <div className="content flex gap-2 items-center text-sm text-light-300 mt-2">
          <div className="rating flex items-center gap-1">
            <img src="./star.svg" alt="Star Icon" className="w-4 h-4" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang uppercase">{original_language}</p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
