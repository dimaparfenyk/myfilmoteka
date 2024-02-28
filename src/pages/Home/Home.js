import { useEffect, useState, useRef } from "react";
import { ThreeCircles } from "react-loader-spinner";
import api from "../../services/api";
import MoviesList from "../../components/MoviesList";
import Pagination from "../../components/Pagination";
import TopUpBtn from "../../components/TopUpBtn";
import css from "./Home.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [btnUpShown, setBtnUpShown] = useState(false);
  const movieBox = useRef(null);

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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="container">
      <div className={css.movies__wrapper} ref={movieBox}>
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
          domRef={movieBox}
          currentPage={currentPage}
        />

        {btnUpShown && <TopUpBtn scrollUp={scrollToTop} />}
      </div>
    </div>
  );
}
