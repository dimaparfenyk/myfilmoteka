import { useEffect, useState } from "react";
import MovieItem from "../MovieItem";
import api from "../../services/api";
import css from "./MoviesList.module.css";

export default function MoviesList({ children, movies, removeMovie }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    api.getGenresIds().then(({ genres }) => setGenres(genres));
  }, []);

  return (
    <div>
      {children}
      <ul className={css.movie__list}>
        {movies &&
          movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              genres={genres}
              removeMovieFromLS={() => removeMovie(movie.id)}
            />
          ))}
      </ul>
    </div>
  );
}
