import React, { useEffect, useState, useMemo } from "react";
import MovieCard from "./MovieCard.jsx";
import "./MovieList.css"; 
import _ from "lodash";

const API_KEY = "74a42177ce5a129faa96c4a04b749de8";
const BASE_URL = "https://api.themoviedb.org/3";

function Upcoming({ search }) {
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  useEffect(() => {
    fetchUpcoming();
  }, []);

  const fetchUpcoming = async () => {
    try {
      const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log("Error fetching upcoming movies:", error);
    }
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
        <h2 className="align-center movie-list-heading">Upcoming Movies 🎬</h2>

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

export default Upcoming;
