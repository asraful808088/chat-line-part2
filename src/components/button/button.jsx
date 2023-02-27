import React from "react";
import style from "./style.module.css";
export default function Button({ name = "button", onClick }) {
  return (
    <button value={name} onClick={onClick} className={style.base}>
      {name}
    </button>
  );
}
