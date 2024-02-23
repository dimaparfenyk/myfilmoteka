import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import SearchBox from "../../components/SearchBox";
import MoviesList from "../../components/MoviesList";
import Button from "../../components/Button/Button";
import css from "./Movies.module.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("movieName") ?? "";

  useEffect(() => {
    // setIsLoading(true);
    setMovies([]);

    api.getMovieByQuery(movieName, currentPage).then(({ results }) => {
      results.length < 20 ? setShowLoadMore(false) : setShowLoadMore(true);

      // const filteredMovies = results
      //   .filter((movie) =>
      //     movie.title.toLowerCase().includes(movieName.toLowerCase().trim())
      //   )
      //   .sort((a, b) => b.vote_average - a.vote_average);

      setMovies(results);
    });
  }, [currentPage, movieName]);

  function updateQueryString(movieName) {
    const nextParams = movieName !== "" ? { movieName } : {};

    setSearchParams(nextParams);
    setShowLoadMore(false);
    setCurrentPage(1);
    setMovies([]);
  }

  function loadMore() {
    setCurrentPage((page) => page + 1);
  }

  return (
    <div className="container">
      <SearchBox value={movieName} onChange={updateQueryString} />
      {movies.length > 0 && <MoviesList movies={movies} />}
      {showLoadMore && (
        <Button
          positionClass={css.centered_btn}
          text={"Load More"}
          onClick={loadMore}
        />
      )}
    </div>
  );
}
