import { useEffect, useState } from "react";
import api from "../../services/api";
import MoviesList from "../../components/MoviesList";
import css from "./Library.module.css";

const Library = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState(() => {
    const storedData = localStorage.getItem("watched");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    api.getGenresIds().then(({ genres }) => setGenres(genres));
  }, []);

  const removeMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem("watched", JSON.stringify(updatedMovies));
  };
  return (
    <div className="container">
      Library
      {movies.length > 0 ? (
        <MoviesList movies={movies} genres={genres} removeMovie={removeMovie} />
      ) : (
        <div className={css.info__text}>
          В библиотеке пока нет фильмов для просмотра
        </div>
      )}
    </div>
  );
};

export default Library;
