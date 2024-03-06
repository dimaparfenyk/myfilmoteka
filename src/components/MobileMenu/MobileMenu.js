import { NavLink } from "react-router-dom";
import { useState } from "react";
import { SlClose } from "react-icons/sl";
import css from "./MobileMenu.module.css";

function MobileMenu({ toggleMobileMenuVisibility }) {
  const [hide, setHide] = useState(false);

  function closeMenu() {
    setHide(true);
    toggleMobileMenuVisibility(true);
  }

  return (
    <div className={`${css.mob__menu} ${hide ? "" : css.show}`}>
      <ul className={css.mobile__nav_list}>
        <li className={css.mob__nav_item}>
          <NavLink exact="true" to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li className={css.mob__nav_item}>
          <NavLink to="/movies" onClick={closeMenu}>
            Movies
          </NavLink>
        </li>
        <li className={css.mob__nav_item}>
          <NavLink to="/library" onClick={closeMenu}>
            Library
          </NavLink>
        </li>
      </ul>
      <button className={css.close__btn} onClick={closeMenu}>
        <SlClose className={css.close__icon} />
      </button>
    </div>
  );
}

export default MobileMenu;
