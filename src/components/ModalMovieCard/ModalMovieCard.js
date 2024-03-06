import { useState } from "react";
import { SlClose } from "react-icons/sl";
import css from "./MovieCard.module.css";
import defaultMovie from "../../images/default-movie.png";
import Button from "../Button/Button";

export default function ModalMovieCard({ movie, onClose }) {
  const {
    id,
    title,
    name,
    poster_path,
    vote_average,
    release_date,
    overview,
    genres,
  } = movie;
  const release_year = release_date.split("-")[0];

  const [isMovieAddToLS, setIsMovieAddToLS] = useState(() => {
    const parsedMovies = JSON.parse(localStorage.getItem("watched")) || [];
    return parsedMovies.some((m) => m.id === id);
  });

  function toggleMovieToLS() {
    setIsMovieAddToLS((prev) => {
      if (prev) {
        removeMovieFromLS();
      } else {
        addMovieToLS();
      }
      return !prev;
    });
  }

  function addMovieToLS() {
    const parsedMovies = JSON.parse(localStorage.getItem("watched")) || [];
    if (!parsedMovies.some((m) => m.id === id)) {
      parsedMovies.push(movie);
      localStorage.setItem("watched", JSON.stringify(parsedMovies));
    }
  }

  function removeMovieFromLS() {
    const parsedMovies = JSON.parse(localStorage.getItem("watched")) || [];
    const updatedMovies = parsedMovies.filter((m) => m.id !== id);
    localStorage.setItem("watched", JSON.stringify(updatedMovies));
  }

  return (
    <div className={css.modal__wrapper}>
      <article className={css.movie__article}>
        <div className={css.modal__imgBox}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : defaultMovie
            }
            alt={title || name}
          />
        </div>
        <div className={css.modal__MovieMeta}>
          <div className={css.right__moviemeta}>
            <h3 className={css.cardTitle}>{title}</h3>
            <div className={css.MovieMeta__box}>
              <span className={css.cardTextSpan}>Rating</span>
              <span className={css.accent__box}>{vote_average.toFixed(1)}</span>
            </div>
            <div className={css.MovieMeta__box}>
              <span className={css.cardTextSpan}>Genre</span>
              {genres.slice(0, 3).map((genre, index) =>
                index === 2 ? (
                  <span key={index} className={css.genreName}>
                    {genre.name}
                  </span>
                ) : (
                  <span key={index} className={css.genreName}>
                    {genre.name + ","}
                  </span>
                )
              )}
            </div>
            <div className={css.MovieMeta__box}>
              <span className={css.cardTextSpan}>Release</span>
              <span>{release_year}</span>
            </div>
            <div className={css.overview__box}>
              <h4 className={css.cardSubtitle}>About</h4>
              {overview}
            </div>
          </div>

          <Button
            onClick={toggleMovieToLS}
            text={isMovieAddToLS ? "Remove" : "Add To Library"}
            positionClass={css.add__btn}
          />
        </div>
      </article>
      <SlClose className={css.closeIcon} onClick={onClose} />
    </div>
  );
}
