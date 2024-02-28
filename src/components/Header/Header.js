import { RiMovie2Line } from "react-icons/ri";
import css from "./Header.module.css";
import ButtonLink from "../ButtonLink";

export default function Header() {
  return (
    <header className={css.header}>
      <div className="container">
        <nav className={css.header__nav}>
          <button className={css.logo_btn}>
            <RiMovie2Line />
            <span>Filmoteka</span>
          </button>

          <ul className={css.header__list}>
            <li className={css.header__item}>
              <ButtonLink to="/">Home</ButtonLink>
            </li>
            <li className={css.header__item}>
              <ButtonLink to="/movies">Movies</ButtonLink>
            </li>
            <li className={css.header__item}>
              <ButtonLink to="/library">Library</ButtonLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
