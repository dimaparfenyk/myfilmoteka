import css from "./Button.module.css";

export default function Button({ positionClass, text, onClick }) {
  return (
    <button
      className={`${css.primary__btn} ${positionClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
