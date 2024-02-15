import { useEffect, useState, forwardRef } from "react";
import MovieItem from "../MovieItem";
import api from "../../services/api";
import css from "./MoviesList.module.css";

const MoviesList = forwardRef(function MoviesList(props, ref) {
  const { children, movies } = props;

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    api.getGenresIds().then(({ genres }) => setGenres(genres));
  }, []);

  return (
    <div>
      {children}
      <ul ref={ref} className={css.movie__list}>
        {movies.map((movie) => (
          <MovieItem
            key={movie.id + movie.backdrop_path}
            movie={movie}
            genres={genres}
          />
        ))}
      </ul>
    </div>
  );
});

export default MoviesList;
