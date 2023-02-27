import React from "react";
import Loading from "../loading/loading";
import Style from "./style.module.css";
export default function Toast({ display }) {
  return (
    <div
      className={Style.root}
      style={{
        display: display ? "flex" : "none",
      }}
    >
      <Loading size={300} />
      <h1 className={Style.h1}>Loading...</h1>
    </div>
  );
}
