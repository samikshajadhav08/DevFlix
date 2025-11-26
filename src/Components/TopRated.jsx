import React, { useEffect, useState, useMemo } from "react";
import MovieCard from "./MovieCard.jsx";
import "./MovieList.css";
import _ from "lodash";

function TopRated({ search }) {
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  useEffect(() => {
    fetchTopRated();
  }, []);

  const fetchTopRated = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=74a42177ce5a129faa96c4a04b749de8"
    );
    const data = await response.json();
    setMovies(data.results);
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  // sorting logic
  const sortedMovies = useMemo(() => {
    if (sort.by === "default") return movies;
    return _.orderBy(movies, [sort.by], [sort.order]);
  }, [movies, sort]);

  // search filter logic
  const filteredMovies = useMemo(() => {
    return sortedMovies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [sortedMovies, search]);

  return (
    <section className="movie-list">
      <header className="align-center movie-list-header">
        <h2 className="align-center movie-list-heading">Top Rated Movies 🎬</h2>

        <div className="align-center movie-list-fs">
          <select
            name="by"
            onChange={handleSort}
            value={sort.by}
            className="movie-sort"
          >
            <option value="default">Sort by</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>

          <select
            name="order"
            onChange={handleSort}
            value={sort.order}
            className="movie-sort"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie-cards">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default TopRated;
