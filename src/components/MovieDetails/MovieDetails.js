import { useState, useEffect, useRef } from "react";
import { useParams, Outlet, useLocation, NavLink } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

import api from "../../services/api";
import Modal from "../Modal";
import ModalMovieCard from "../ModalMovieCard";
import ButtonLink from "../ButtonLink";
import css from "./MovieDetails.module.css";
import defaultMovie from "../../images/default-movie.png";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [modalShown, setModalShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? "/movies");
  const articleRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .getDetais(movieId)
      .then((res) => {
        if (!res) return;

        setMovie(res);
      })
      .finally(() => setIsLoading(false));
  }, [movieId]);

  function scrollSmooth() {
    const scrollHeight = articleRef.current?.getBoundingClientRect().height;

    window.scrollTo({
      top: scrollHeight * 1.5,
      behavior: "smooth",
    });
  }

  const { id, title, name, vote_average, release_date, genres, overview } =
    movie;

  return (
    <div className="container">
      <ButtonLink
        to={backLinkHref.current}
        state={{ from: location }}
        propClass={css.primary__btn}
      >
        Back
      </ButtonLink>

      {isLoading ? (
        <ThreeCircles
          visible={true}
          color="#ff6b01"
          ariaLabel="three-circles-loading"
          wrapperClass="spinnerBox"
        />
      ) : (
        id && (
          <div className={css.movie__container}>
            <article className={css.movie__article} ref={articleRef}>
              <div
                className={css.poster__box}
                onClick={() => setModalShown(true)}
              >
                <img
                  className={css.movie__poster}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : defaultMovie
                  }
                  alt={title || name}
                />
              </div>
              <div className={css.movie__meta}>
                <div className={css.inner__movie_meta}>
                  <h2 className={css.movie__subtitle}>
                    {title} ({release_date.split("-")[0]})
                  </h2>
                  <h3>About</h3>
                  <p className={css.overview__text}>{overview}</p>
                  <ul className={css.genres__list}>
                    {genres.slice(0, 3).map((genre, index) =>
                      index === 2 ? (
                        <li key={index} className={css.genre_item}>
                          {genre.name}
                        </li>
                      ) : (
                        <li key={index} className={css.genre_item}>
                          {genre.name + ","}
                        </li>
                      )
                    )}
                    <li key={vote_average} className={css.genre_item}>
                      <p className={`${css.accent__box} ${css.movie__text}`}>
                        {vote_average.toFixed(1)}
                      </p>
                    </li>
                  </ul>
                </div>
                <ul className={css.movie__navList}>
                  <li className={css.movie__navItem} onClick={scrollSmooth}>
                    <NavLink to="cast" className="styled__link">
                      Cast
                    </NavLink>
                  </li>
                  <li className={css.movie__navItem} onClick={scrollSmooth}>
                    <NavLink to="reviews" className="styled__link">
                      Reviews
                    </NavLink>
                  </li>
                </ul>
              </div>
            </article>
            <div id="outlet-box">
              <Outlet />
            </div>
          </div>
        )
      )}
      {modalShown && (
        <Modal
          onClose={() => setModalShown((prev) => !prev)}
          bg={
            movie?.backdrop_path
              ? `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`
              : "none"
          }
        >
          <ModalMovieCard
            movie={movie}
            onClose={() => setModalShown((prev) => !prev)}
          />
        </Modal>
      )}
    </div>
  );
}
