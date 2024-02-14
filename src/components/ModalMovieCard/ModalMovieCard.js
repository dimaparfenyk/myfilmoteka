import { SlClose } from "react-icons/sl";
import css from "./MovieCard.module.css";
import Button from "../Button";

export default function ModalMovieCard({ movie, onClose }) {
  const {
    title,
    name,
    poster_path,
    vote_average,
    release_date,
    overview,
    genres,
  } = movie;
  const release_year = release_date.split("-")[0];

  return (
    <div className={css.modal__wrapper}>
      <article className={css.movie__article}>
        <div className={css.modal__imgBox}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
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
          <div className={css.button__box}>
            <Button positionClass={css.modal__btn} text={"Add to Watched"} />
            <Button positionClass={css.modal__btn} text={"Add to Queue"} />
          </div>
        </div>
      </article>
      <SlClose className={css.closeIcon} onClick={onClose} />
    </div>
  );
}
