import { HiHeart } from "react-icons/hi2";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.footer__container}>
        2024 | Developed by
        <HiHeart className={css.footer__icon} />
        <a
          className={css.footer__developerLink}
          href="https://www.linkedin.com/in/dmitrij-parfeniuk-3b882323b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dmitrij Parfenyuk
        </a>
      </div>
    </footer>
  );
}
