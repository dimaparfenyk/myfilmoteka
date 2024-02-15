import { useEffect, useRef, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import api from "../../services/api";
import MoviesList from "../../components/MoviesList";
import css from "./Home.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    setShowLoadMore(false);

    api
      .getPopularMovies(page)
      .then(({ results }) => {
        if (!results) return;

        page === 1
          ? setMovies([...results])
          : setMovies((prev) => [...prev, ...results]);

        setShowLoadMore(true);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [page]);

  function loadMore() {
    setPage((page) => page + 1);
    scrollToFirstMovieCard();
  }

  function scrollToFirstMovieCard() {
    const movieCardHeight =
      galleryRef.current?.firstElementChild.getBoundingClientRect().height;

    // console.log("movieCardHeight :>> ", movieCardHeight);
    // window.scrollBy({
    //   top: movieCardHeight * 2,
    //   behavior: "smooth",
    // });

    galleryRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="container">
      <div className={css.movies__wrapper}>
        <MoviesList movies={movies} ref={galleryRef} />
        {isLoading && (
          <ThreeCircles
            visible={true}
            color="#ff6b01"
            ariaLabel="three-circles-loading"
            wrapperClass={css.spinnerBox}
          />
        )}
        {showLoadMore && <button onClick={loadMore}>Load More</button>}
      </div>
    </div>
  );
}
