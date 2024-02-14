import { useState, useEffect, useRef } from "react";
import { useParams, Outlet, useLocation, NavLink } from "react-router-dom";

import api from "../../services/api";
import Modal from "../Modal";
import ModalMovieCard from "../ModalMovieCard";
import ButtonLink from "../ButtonLink";
import css from "./MovieDetails.module.css";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [modalShown, setModalShown] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? "/movies");
  const outletBoxRef = useRef(null);

  useEffect(() => {
    api.getDetais(movieId).then((res) => {
      if (!res) return;
      setMovie(res);
    });
  }, [movieId]);

  function scrollSmooth() {
    outletBoxRef.current?.scrollIntoView({ behavior: "smooth" });
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

      {id && (
        <div className={css.movie__container}>
          <article className={css.movie__article}>
            <div
              className={css.poster__box}
              onClick={() => setModalShown(true)}
            >
              <img
                className={css.movie__poster}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={title || name}
              />
            </div>
            <div className={css.movie__meta}>
              <div className={css.inner__movie_meta}>
                <h2 className={css.movie__subtitle}>{title}</h2>
                <h3>About</h3>
                <p className={css.overview__text}>{overview}</p>
                <div className={css.movie__details_box}>
                  <ul className={css.genres__list}>
                    {genres.slice(0, 3).map((genre, index) =>
                      index === 2 ? (
                        <li key={index} className={css.genreName}>
                          {genre.name}
                        </li>
                      ) : (
                        <li key={index} className={css.genreName}>
                          {genre.name + ","}
                        </li>
                      )
                    )}
                  </ul>
                  <p className={`${css.first__paragraph} ${css.movie__text}`}>
                    {release_date.split("-")[0]}
                  </p>
                  <p className={`${css.accent__box} ${css.movie__text}`}>
                    {vote_average.toFixed(1)}
                  </p>
                </div>
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
          <div id="outlet-box" ref={outletBoxRef}>
            <Outlet />
          </div>
        </div>
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
