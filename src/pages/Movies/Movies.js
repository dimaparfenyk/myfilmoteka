import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import api from "../../services/api";
import SearchBox from "../../components/SearchBox";
import MoviesList from "../../components/MoviesList";
import Button from "../../components/Button/Button";
import TopUpBtn from "../../components/TopUpBtn";
import css from "./Movies.module.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [btnUpShown, setBtnUpShown] = useState(false);

  const movieBox = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("movieName") ?? "";

  useEffect(() => {
    api.getMovieByQuery(movieName, currentPage).then(({ results }) => {
      results.length < 20 ? setShowLoadMore(false) : setShowLoadMore(true);
      if (movieName.length > 2) {
        const moviesWithPoster = results.filter((movie) => movie.backdrop_path);
        setMovies([...moviesWithPoster]);
      } else {
        setMovies([]);
        setShowLoadMore(false);
      }
    });
  }, [currentPage, movieName]);

  useEffect(() => {
    api.getGenresIds().then(({ genres }) => setGenres(genres));
  }, []);

  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > 250 ? setBtnUpShown(true) : setBtnUpShown(false);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function updateQueryString(movieName) {
    const nextParams = movieName !== "" ? { movieName } : {};

    setSearchParams(nextParams);
    setShowLoadMore(false);
    setCurrentPage(1);
  }

  function loadMore() {
    setCurrentPage((page) => page + 1);
    scrollToTop();
  }

  const scrollToTop = () => window.scrollTo({ top: 200, behavior: "smooth" });

  return (
    <div className="container">
      <div className={css.movies__wrapper} ref={movieBox}>
        <SearchBox value={movieName} onChange={updateQueryString} />

        {movies.length > 0 && <MoviesList movies={movies} genres={genres} />}
        {showLoadMore && (
          <Button
            positionClass={css.centered_btn}
            text={"Load More"}
            onClick={loadMore}
          />
        )}
        {btnUpShown && <TopUpBtn scrollUp={scrollToTop} />}
      </div>
    </div>
  );
}
