import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import Wrapper from "../Wrapper";

import api from "../../services/api";
import defaultphoto from "../../images/avatar.png";
import css from "./Cast.module.css";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .getCredits(movieId)
      .then((res) => {
        if (!res) return;
        setCast([...res.cast]);
      })
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <Wrapper title={"Cast"}>
      {isLoading ? (
        <ThreeCircles
          visible={true}
          color="#ff6b01"
          ariaLabel="three-circles-loading"
          wrapperClass="spinnerBox"
        />
      ) : (
        <ul className={css.cast__list}>
          {cast.length > 0 &&
            cast.slice(0, 18).map(({ id, name, character, profile_path }) => (
              <li key={id} className={css.cast__item}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : defaultphoto
                  }
                  alt={`${name}`}
                />
                <p className={css.cast__text}>{name}</p>
                <p className={css.cast__text}>Role: {character}</p>
              </li>
            ))}
        </ul>
      )}
    </Wrapper>
  );
}
