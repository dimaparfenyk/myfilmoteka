import { NavLink } from "react-router-dom";
import css from "./ButtonLink.module.css";

export default function ButtonLink({ children, to, state, propClass }) {
  return (
    <NavLink
      to={to}
      state={state}
      className={`${css.styled__link} ${propClass}`}
    >
      {children}
    </NavLink>
  );
}
