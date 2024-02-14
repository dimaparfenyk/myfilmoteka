import { HiSearch } from "react-icons/hi";
import css from "./SearchBox.module.css";

export default function SearchBox({ value, onChange }) {
  return (
    <div className={css.searchBox}>
      <div className={css.search__wrapper}>
        <input
          placeholder="Search movie"
          className={css.search__movie}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="btn">
          <HiSearch className={css.search__icon} />
        </button>
      </div>
    </div>
  );
}
