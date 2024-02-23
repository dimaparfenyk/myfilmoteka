import { useEffect, useState, useRef } from "react";
import { ThreeCircles } from "react-loader-spinner";
import api from "../../services/api";
import MoviesList from "../../components/MoviesList";
import Pagination from "../../components/Pagination";
import { ImArrowUp } from "react-icons/im";
import css from "./Home.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [btnUpShown, setBtnUpShown] = useState(false);
  const movieGallery = useRef(null);

  useEffect(() => {
    // Функция для обработки события скролла
    const handleScroll = () => {
      window.scrollY > 250 ? setBtnUpShown(true) : setBtnUpShown(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);

    api
      .getPopularMovies(currentPage)
      .then((res) => {
        if (!res.results) return;
        setMovies(res.results);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <div className={css.movies__wrapper} ref={movieGallery}>
        {isLoading && (
          <ThreeCircles
            visible={true}
            color="#ff6b01"
            ariaLabel="three-circles-loading"
            wrapperClass={css.spinnerBox}
          />
        )}
        <MoviesList movies={movies} />
        <Pagination
          onPageChange={setCurrentPage}
          domRef={movieGallery}
          currentPage={currentPage}
        />

        {btnUpShown && (
          <button className={css.arr__up} onClick={scrollToTop}>
            <ImArrowUp className={css.up__icon} />
          </button>
        )}
      </div>
    </div>
  );
}
