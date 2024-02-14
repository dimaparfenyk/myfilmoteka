import css from "./Button.module.css";

export default function Button({ positionClass, text }) {
  return (
    <button className={`${css.primary__btn} ${positionClass}`}>{text}</button>
  );
}
