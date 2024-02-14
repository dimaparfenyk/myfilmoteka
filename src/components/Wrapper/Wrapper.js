import css from "./Wrapper.module.css";

export default function Wrapper({ children, title }) {
  return (
    <div className={css.wrapper}>
      <h2 className={css.subpage__title}>{title}</h2>
      {children}
    </div>
  );
}
