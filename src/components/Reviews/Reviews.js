import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import api from "../../services/api";
import css from "./Reviews.module.css";
import Wrapper from "../Wrapper";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .getReviews(movieId)
      .then((res) => {
        if (!res) return;
        setReviews([...res.results]);
      })
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <Wrapper title={"Reviews"}>
      {isLoading ? (
        <ThreeCircles
          visible={true}
          color="#ff6b01"
          ariaLabel="three-circles-loading"
          wrapperClass="spinnerBox"
        />
      ) : reviews.length > 0 ? (
        <ul className={css.reviews__list}>
          {reviews.map(({ id, content, author }) => (
            <li key={id} className={css.review__item}>
              <h3 className={css.userName}>Author: {author}</h3>
              <p className={css.review__text}>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>There are no reviews for this film.</div>
      )}
    </Wrapper>
  );
}
