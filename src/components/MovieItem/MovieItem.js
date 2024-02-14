import { Link, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import css from "./MovieItem.module.css";

export default function MovieItem({ movie, genres }) {
  const {
    genre_ids,
    poster_path,
    title,
    name,
    id,
    release_date,
    vote_average,
  } = movie;

  const location = useLocation();
  const linkPath = location.pathname.includes("/movies")
    ? `${id}`
    : `movies/${id}`;

  const currGenres = genres.filter((item) => genre_ids.includes(item.id));

  return (
    <li className={css.movieItem}>
      <Link
        to={linkPath}
        state={{ from: location }}
        className={css.movie__link}
      >
        <img
          className={css.movie__poster}
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title || name}
        />
        <h3 className={css.card__title}>{title || name}</h3>
      </Link>

      <ul className={css.genres__list}>
        {currGenres.slice(0, 3).map(({ name }) => (
          <li key={nanoid()} className={css.genre__item}>
            {name}
          </li>
        ))}
        <li className={css.genre__item}>| {release_date.split("-")[0]}</li>
        <li className={css.vote__item}>{vote_average.toFixed(1)}</li>
      </ul>
    </li>
  );
}
