import React from "react";
import css from "./TopUpBtn.module.css";
import { ImArrowUp } from "react-icons/im";

const TopUpBtn = ({ scrollUp }) => {
  return (
    <button className={css.arr__up} onClick={scrollUp}>
      <ImArrowUp className={css.up__icon} />
    </button>
  );
};

export default TopUpBtn;
