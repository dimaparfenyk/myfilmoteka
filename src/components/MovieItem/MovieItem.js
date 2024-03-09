import { Link, useLocation } from "react-router-dom";
import { ImBin } from "react-icons/im";
import css from "./MovieItem.module.css";
import defaultMovie from "../../images/default-movie.png";

export default function MovieItem({ movie, genres, removeMovieFromLS }) {
  const { poster_path, title, name, id, release_date, vote_average } = movie;
  const location = useLocation();
  const linkPath = location.pathname.includes("/movies")
    ? `${id}`
    : `/movies/${id}`;

  const isCurrentPageLibrary = location.pathname === "/library";

  return (
    <li className={css.movieItem}>
      <Link
        to={linkPath}
        state={{ from: location }}
        className={css.movie__link}
      >
        <img
          className={css.movie__poster}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultMovie
          }
          alt={title || name}
        />
        <h3 className={css.card__title}>
          {title || name} ({release_date.split("-")[0]})
        </h3>
      </Link>

      <ul className={css.genres__list}>
        {genres
          ? genres.slice(0, 3).map(({ name }) => (
              <li key={name} className={css.genre__item}>
                {name}
              </li>
            ))
          : null}

        <li className={css.vote__item}>{vote_average.toFixed(1)}</li>
      </ul>
      {isCurrentPageLibrary && (
        <button className={css.remove__btn}>
          <ImBin
            className={css.removeIcon}
            onClick={() => removeMovieFromLS()}
          />
        </button>
      )}
    </li>
  );
}
