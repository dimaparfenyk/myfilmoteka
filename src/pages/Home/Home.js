import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import api from "../../services/api";
import MoviesList from "../../components/MoviesList";
import css from "./Home.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    api
      .getPopularMovies(currentPage)
      .then((res) => {
        if (!res.results) return;

        setMovies(res.results);
        res.total_pages > 500
          ? setTotalPages(500)
          : setTotalPages(res.total_pages);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  return (
    <div className="container">
      <div className={css.movies__wrapper}>
        {isLoading && (
          <ThreeCircles
            visible={true}
            color="#ff6b01"
            ariaLabel="three-circles-loading"
            wrapperClass={css.spinnerBox}
          />
        )}
        <MoviesList
          movies={movies}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
