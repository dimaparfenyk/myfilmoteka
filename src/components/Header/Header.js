import { useState } from "react";
import { RiMovie2Line } from "react-icons/ri";
import { ImMenu } from "react-icons/im";
import css from "./Header.module.css";
import ButtonLink from "../ButtonLink";
import MobileMenu from "../MobileMenu";

export default function Header() {
  const [hide, setHide] = useState(true);

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
          <button
            className={css.burger__btn}
            onClick={() => {
              setHide(false);
            }}
          >
            <ImMenu className={css.burger__icon} />
          </button>
        </nav>
        {hide ? (
          <></>
        ) : (
          <MobileMenu
            toggleMobileMenuVisibility={() => {
              setHide((prevHide) => !prevHide);
            }}
          />
        )}
      </div>
    </header>
  );
}
