import React from "react";
import "./MovieCard.css";

function MovieCard({movie }) {
  return (
    <div>
        <a href={`https://www.themoviedb.org/movie/${movie.id}`} target='_blank' className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie-poster" className="movie-poster" />
      <div className="movie-details">
        <h3 className="movie-details-heading">{movie.original_title}</h3>
        <div className="align-center movie-data-rate">
          <p>{movie.release_date}</p>
          <p>{movie.rate_average}</p>
          
        </div>
        <p className="movie-desc">
        {movie.overview.slice(0,100)+"..."}
      </p>
      </div>
      
    </a>
    </div>
    
    
  );
}

export default MovieCard;
