import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import api from "../../services/api";
import MoviesList from "../../components/MoviesList";
import css from "./Home.module.css";
import Modal from "../../components/Modal";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isPreload, setIsPreload] = useState(false);

  useEffect(() => {
    api
      .getTrendingMovies()
      .then((res) => {
        setIsPreload(true);
        if (!res) return;
        setMovies([...res.results]);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsPreload(false));
  }, []);

  return (
    <div className="container">
      <div className={css.movies__wrapper}>
        <MoviesList movies={movies} />
      </div>
      {isPreload && (
        <Modal>
          <ThreeCircles
            visible={true}
            color="#ff6b01"
            ariaLabel="three-circles-loading"
            wrapperClass={css.spinnerBox}
          />
        </Modal>
      )}
    </div>
  );
}
