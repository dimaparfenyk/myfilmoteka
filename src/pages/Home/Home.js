import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import api from "../../services/api";
import MoviesList from "../../components/MoviesList";
import css from "./Home.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .getTrendingMovies()
      .then((res) => {
        if (!res) return;
        setMovies([...res.results]);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <div className={css.movies__wrapper}>
        {isLoading ? (
          <ThreeCircles
            visible={true}
            color="#ff6b01"
            ariaLabel="three-circles-loading"
            wrapperClass={css.spinnerBox}
          />
        ) : (
          <MoviesList movies={movies} />
        )}
      </div>
    </div>
  );
}
